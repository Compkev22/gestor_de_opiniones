import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

// ESTA es la exportación que te falta o que tiene el nombre mal escrito
export const createPublicationValidator = [
    body('PublicationTitle').notEmpty().withMessage('El título es requerido'),
    body('PublicationCategory').notEmpty().withMessage('La categoría es requerida'),
    body('PublicationContent').notEmpty().withMessage('El contenido es requerido'),
    body('PublicationAuthor').notEmpty().withMessage('El autor es requerido').isMongoId().withMessage('No es un ID válido'),
    checkValidators
];

export const publicationIdValidator = [
    param('id').isMongoId().withMessage('No es un ID válido de MongoDB'),
    checkValidators
];

export const updateDeletePublicationValidator = [
    param('id').isMongoId().withMessage('No es un ID válido de MongoDB'),
    body('authorId').notEmpty().withMessage('El ID del autor es necesario para validar permisos').isMongoId().withMessage('ID de autor inválido'),
    checkValidators
];