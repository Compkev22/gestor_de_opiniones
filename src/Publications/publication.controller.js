import Publication from './publication.model.js';
import User from '../Users/user.model.js';

// Crear Publicación
export const createPublication = async (req, res) => {
    try {
        const data = req.body;

        // Validar que el autor exista antes de crear
        const userExists = await User.findById(data.PublicationAuthor);
        if (!userExists) {
            return res.status(404).json({
                success: false,
                message: 'El autor (usuario) no existe'
            });
        }

        const publication = new Publication(data);
        await publication.save();

        res.status(201).json({
            success: true,
            message: 'Publicación creada exitosamente',
            data: publication
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al crear la publicación',
            error: error.message
        });
    }
};

// Obtener Publicaciones (Con Paginación)
export const getPublications = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const filter = { PublicationStatus: 'ACTIVO' };

        const publications = await Publication.find(filter)
            .populate({
                path: 'PublicationAuthor',
                select: 'UserName UserUsername UserEmail'
            })
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit))
            .sort({ PublicationCreatedAt: -1 });

        const total = await Publication.countDocuments(filter);

        res.status(200).json({
            success: true,
            data: publications,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / limit),
                totalRecords: total,
                limit: parseInt(limit)
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener publicaciones',
            error: error.message
        });
    }
};

// Obtener Publicación por ID
export const getPublicationById = async (req, res) => {
    try {
        const { id } = req.params;
        const publication = await Publication.findById(id).populate('PublicationAuthor', 'UserName UserUsername');

        if (!publication) {
            return res.status(404).json({ success: false, message: 'Publicación no encontrada' });
        }

        res.status(200).json({
            success: true,
            data: publication
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error al obtener publicación', error: error.message });
    }
};

// Actualizar Publicación (Validando propiedad sin token)
export const updatePublication = async (req, res) => {
    try {
        const { id } = req.params;
        // Extraemos authorId para verificar, y 'data' es lo que vamos a actualizar
        const { authorId, ...data } = req.body; 

        const publication = await Publication.findById(id);

        if (!publication) {
            return res.status(404).json({ success: false, message: 'Publicación no encontrada' });
        }

        // VERIFICACIÓN MANUAL: Comparamos el autor de la BD con el enviado en el body
        if (publication.PublicationAuthor.toString() !== authorId) {
            return res.status(401).json({
                success: false,
                message: 'No puedes editar esta publicación porque no te pertenece'
            });
        }

        const updatedPublication = await Publication.findByIdAndUpdate(id, data, { new: true });

        res.status(200).json({
            success: true,
            message: 'Publicación actualizada',
            data: updatedPublication
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar',
            error: error.message
        });
    }
};

// Eliminar Publicación (Soft Delete)
export const deletePublication = async (req, res) => {
    try {
        const { id } = req.params;
        const { authorId } = req.body; // Necesario para verificar propiedad

        const publication = await Publication.findById(id);

        if (!publication) {
            return res.status(404).json({ success: false, message: 'Publicación no encontrada' });
        }

        // Verificación de propiedad
        if (publication.PublicationAuthor.toString() !== authorId) {
            return res.status(401).json({
                success: false,
                message: 'No puedes eliminar esta publicación porque no te pertenece'
            });
        }

        // Soft Delete
        publication.PublicationStatus = 'ELIMINADO';
        await publication.save();

        res.status(200).json({
            success: true,
            message: 'Publicación eliminada correctamente',
            data: publication
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar',
            error: error.message
        });
    }
};