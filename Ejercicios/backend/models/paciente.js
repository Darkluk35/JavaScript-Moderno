import mongoose from 'mongoose';

const pacientesSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    propietario: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    alta: {
        type: Date,
        required: true,
    },
    sintomas: {
        type: String,
        required: true,
    },
    veterinario:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Veterinario',
    }});