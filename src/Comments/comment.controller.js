import Comment from './comment.model.js';
import Publication from '../Publications/publication.model.js';
// Crear Comentario
export const createComment = async (req, res) => {
    try {
        const data = req.body;
        
        // 1. Validar que la publicación exista y esté activa
        const publicationExist = await Publication.findOne({ 
            _id: data.CommentPublication, 
            PublicationStatus: 'ACTIVO' 
        });
        
        if (!publicationExist) {
            return res.status(404).json({
                success: false,
                message: 'La publicación no existe o fue eliminada'
            });
        }

        const comment = new Comment(data);
        await comment.save();

        res.status(201).json({
            success: true,
            message: 'Comentario agregado',
            data: comment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al agregar comentario',
            error: error.message
        });
    }
};

// Obtener comentarios de una publicación (Opcional pero útil)
export const getCommentsByPublication = async (req, res) => {
    try {
        const { publicationId } = req.params;
        const { limit = 10, page = 1 } = req.query;

        const comments = await Comment.find({ CommentPublication: publicationId, CommentStatus: 'ACTIVO' })
            .populate('CommentAuthor', 'UserName UserUsername')
            .limit(parseInt(limit))
            .skip((parseInt(page) - 1) * parseInt(limit));

        res.status(200).json({
            success: true,
            data: comments
        });
    } catch (error) {
         res.status(500).json({
            success: false,
            message: 'Error al obtener comentarios',
            error: error.message
        });
    }
}

// Editar Comentario
export const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { authorId, ...data } = req.body; // authorId para verificar

        const comment = await Comment.findById(id);

        if (!comment) {
            return res.status(404).json({ success: false, message: 'Comentario no encontrado' });
        }

        // Verificar propiedad
        if (comment.CommentAuthor.toString() !== authorId) {
            return res.status(401).json({
                success: false,
                message: 'No puedes editar comentarios de otros'
            });
        }

        const updatedComment = await Comment.findByIdAndUpdate(id, data, { new: true });

        res.status(200).json({
            success: true,
            message: 'Comentario actualizado',
            data: updatedComment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar comentario',
            error: error.message
        });
    }
};

// Eliminar Comentario
export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { authorId } = req.body;

        const comment = await Comment.findById(id);

        if (!comment) {
            return res.status(404).json({ success: false, message: 'Comentario no encontrado' });
        }

        // Verificar propiedad
        if (comment.CommentAuthor.toString() !== authorId) {
            return res.status(401).json({
                success: false,
                message: 'No puedes eliminar comentarios de otros'
            });
        }

        comment.CommentStatus = 'ELIMINADO';
        await comment.save();

        res.status(200).json({
            success: true,
            message: 'Comentario eliminado',
            data: comment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al eliminar comentario',
            error: error.message
        });
    }
};