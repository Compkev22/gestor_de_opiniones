'use strict';

import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    CommentContent: {
        type: String,
        required: [true, 'El comentario no puede estar vacío'],
        trim: true,
        maxLength: [500, 'El comentario es muy largo']
    },
    // RELACIÓN 1: Quién comenta
    CommentAuthor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El autor del comentario es requerido']
    },
    // RELACIÓN 2: En qué publicación comenta
    CommentPublication: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Publication',
        required: [true, 'La publicación es requerida']
    },
    CommentStatus: {
        type: String,
        default: 'ACTIVO',
        enum: ['ACTIVO', 'ELIMINADO']
    },
    CommentCreatedAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("Comment", commentSchema);