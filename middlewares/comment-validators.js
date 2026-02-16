import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

export const createCommentValidator = [
    body('CommentContent').notEmpty().withMessage('El contenido del comentario es requerido'),
    body('CommentPublication').notEmpty().withMessage('La publicación es requerida').isMongoId().withMessage('No es un ID válido'),
    body('CommentAuthor').notEmpty().withMessage('El autor es requerido').isMongoId().withMessage('No es un ID válido'),
    checkValidators
];

export const commentIdValidator = [
    param('id').isMongoId().withMessage('No es un ID válido de MongoDB'),
    checkValidators
];

// Igual que publicación, requerimos authorId en el body
export const updateDeleteCommentValidator = [
    param('id').isMongoId().withMessage('No es un ID válido'),
    body('authorId').notEmpty().withMessage('El ID del autor es necesario para validar permisos').isMongoId().withMessage('ID de autor inválido'),
    checkValidators
];