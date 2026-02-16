import { Router } from 'express';
import { 
    createComment, 
    updateComment, 
    deleteComment, 
    getCommentsByPublication 
} from './comment.controller.js';
import { 
    createCommentValidator, 
    updateDeleteCommentValidator 
    // Si tienes un validador solo para param id, impórtalo también
} from '../../middlewares/comment-validators.js';

// Validator simple inline para getCommentsByPublication si no creamos uno específico
import { param } from 'express-validator';
import { checkValidators } from '../../middlewares/check-validators.js';

const router = Router();

router.post('/', createCommentValidator, createComment);

router.get('/:publicationId', [
    param('publicationId').isMongoId().withMessage('No es un ID válido'),
    checkValidators
], getCommentsByPublication);

router.put('/:id', updateDeleteCommentValidator, updateComment);

router.delete('/:id', updateDeleteCommentValidator, deleteComment);

export default router;