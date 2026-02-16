import { body, param } from 'express-validator';
import { checkValidators } from './check-validators.js';

// Validar Registro
export const registerValidator = [
    body('UserName').notEmpty().withMessage('El nombre es requerido'),
    body('UserSurname').notEmpty().withMessage('El apellido es requerido'),
    body('UserUsername').notEmpty().withMessage('El nombre de usuario es requerido'),
    body('UserEmail').notEmpty().withMessage('El correo es requerido').isEmail().withMessage('No es un correo válido'),
    body('UserPassword').isLength({ min: 6 }).withMessage('El password debe contener al menos 6 caracteres'),
    checkValidators
];

// Validar Login
export const loginValidator = [
    body('userLoggin').notEmpty().withMessage('El correo o username es requerido'),
    body('password').notEmpty().withMessage('La contraseña es requerida'),
    checkValidators
];

// Validar ID en params (para GetById, Delete, etc.)
export const userIdValidator = [
    param('id').isMongoId().withMessage('No es un ID válido de MongoDB'),
    checkValidators
];

// Validar Update
export const updateUserValidator = [
    param('id').isMongoId().withMessage('No es un ID válido de MongoDB'),
    checkValidators
];