import User from './user.model.js';

// 1. Obtener todos los usuarios (Paginado)
export const getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, UserStatus } = req.query;

    const filter = {};
    if (UserStatus) {
      filter.UserStatus = UserStatus;
    }

    const users = await User.find(filter)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .sort({ UserCreatedAt: -1 });

    const total = await User.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: users,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalRecords: total,
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener los usuarios',
      error: error.message,
    });
  }
};

// 2. Obtener un usuario por ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado',
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener el usuario',
      error: error.message,
    });
  }
};

// 3. Crear Usuario (Sin encriptación)
export const createUser = async (req, res) => {
  try {
    const userData = req.body;

    // Se guarda la contraseña tal cual (texto plano)
    const user = new User(userData);
    await user.save();

    res.status(201).json({
      success: true,
      message: 'Usuario creado exitosamente',
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al crear el usuario',
      error: error.message,
    });
  }
};

// 4. Login (Verifica credenciales y devuelve usuario, SIN TOKEN)
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

    // Login exitoso, devolvemos info del usuario
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

// 5. Actualizar Usuario (Valida contraseña anterior en texto plano)
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    // Extraemos las contraseñas para verificarlas aparte
    const { UserPassword, oldPassword, ...data } = req.body;

    const userStored = await User.findById(id);

    if (!userStored) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado',
      });
    }

    // Si intenta cambiar la contraseña
    if (UserPassword && oldPassword) {
        // Verificar que la anterior coincida (Texto plano)
        if (userStored.UserPassword !== oldPassword) {
            return res.status(400).json({
                success: false,
                message: 'La contraseña anterior no coincide',
            });
        }
        // Asignar la nueva
        data.UserPassword = UserPassword;
    } else if (UserPassword && !oldPassword) {
         return res.status(400).json({
            success: false,
            message: 'Debes ingresar tu contraseña anterior (oldPassword) para cambiarla',
        });
    }

    const userUpdated = await User.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Usuario actualizado exitosamente',
      data: userUpdated,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error al actualizar el usuario',
      error: error.message,
    });
  }
};

// 6. Cambiar Estado
export const changeUserStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado',
      });
    }

    user.UserStatus =
      user.UserStatus === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO';

    await user.save();

    res.status(200).json({
      success: true,
      message: `Usuario ${user.UserStatus === 'ACTIVO' ? 'activado' : 'desactivado'} exitosamente`,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al cambiar el estado del usuario',
      error: error.message,
    });
  }
};