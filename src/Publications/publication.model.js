'use strict';

import mongoose from "mongoose";

const publicationSchema = new mongoose.Schema({
    PublicationTitle: {
        type: String,
        required: [true, 'El título es requerido'],
        trim: true,
        maxLength: [100, 'El título no puede exceder 100 caracteres']
    },
    PublicationCategory: {
        type: String,
        required: [true, 'La categoría es requerida'],
        trim: true,
        uppercase: true // Para estandarizar categorías (ej: DEPORTES, NOTICIAS)
    },
    PublicationContent: {
        type: String,
        required: [true, 'El contenido es requerido'],
        trim: true
    },
    // RELACIÓN: Quién creó la publicación
    PublicationAuthor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El autor es requerido']
    },
    PublicationStatus: {
        type: String,
        default: 'ACTIVO',
        enum: ['ACTIVO', 'ELIMINADO'] // Soft delete según tu lógica
    },
    PublicationCreatedAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Publication", publicationSchema);