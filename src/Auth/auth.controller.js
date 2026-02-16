import User from '../Users/user.model.js';

// REGISTRAR USUARIO (Crear Cuenta)
export const register = async (req, res) => {
    try {
        const data = req.body;
        
        // Creamos la instancia del usuario
        // Como pediste, la contraseña va en texto plano (sin encriptar)
        const user = new User(data);
        
        // Guardamos en DB
        await user.save();

        res.status(201).json({
            success: true,
            message: 'Cuenta creada exitosamente',
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al crear la cuenta',
            error: error.message
        });
    }
};

// INICIAR SESIÓN
export const login = async (req, res) => {
    try {
        const { userLoggin, password } = req.body;

        // Buscar por Email O Username
        const user = await User.findOne({
            $or: [{ UserEmail: userLoggin }, { UserUsername: userLoggin }]
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Credenciales inválidas (Usuario no encontrado)'
            });
        }

        // Verificar contraseña (Texto plano)
        if (user.UserPassword !== password) {
            return res.status(400).json({
                success: false,
                message: 'Credenciales inválidas (Contraseña incorrecta)'
            });
        }

        // Login exitoso
        res.status(200).json({
            success: true,
            message: 'Login exitoso',
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error en el servidor',
            error: error.message
        });
    }
};