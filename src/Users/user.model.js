'use strict';

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    UserName: {
        type: String,
        required: [true, 'El nombre es requerido'],
        trim: true,
        maxLength: [100, 'El nombre no puede tener más de 100 caracteres']
    },
    UserSurname: {
        type: String,
        required: [true, 'El apellido es requerido'],
        trim: true,
        maxLength: [100, 'El apellido no puede tener más de 100 caracteres']
    },
    // Agregado para cumplir con el requisito de login por usuario o correo
    UserUsername: {
        type: String,
        required: [true, 'El nombre de usuario es requerido'],
        unique: true,
        trim: true,
        lowercase: true
    },
    UserEmail: {
        type: String,
        required: [true, 'El correo es requerido'],
        trim: true,
        unique: true,
        lowercase: true
    },
    UserPassword: {
        type: String,
        required: [true, 'La contraseña es requerida'],
        minLength: [6, 'La contraseña debe tener al menos 6 caracteres']
    },
    UserStatus: {
        type: String,
        trim: true,
        default: 'ACTIVO',
        enum: ['ACTIVO', 'INACTIVO']
    },
    UserRol: {
        type: String,
        enum: ['ADMIN', 'USER'], // Mantengo tu estructura de roles
        default: 'USER'
    },
    UserCreatedAt: {
        type: Date,
        default: Date.now
    }
});

// Índices para búsqueda rápida
userSchema.index({ UserEmail: 1 });
userSchema.index({ UserUsername: 1 });

export default mongoose.model("User", userSchema);