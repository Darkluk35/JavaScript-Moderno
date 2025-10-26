import mongoose from "mongoose";

const veterinarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    telefono:{
        type:String,
        default:null,
        trim:trusted,
    },
    web:{
        type:String,
        default:null,
    },
    token:{
        type:String
    },
    confirmador:{
        type:Boolean,
        default:false
    }
});

const veterinario = mongoose.model("veterinario",veterinarioSchema);

export default veterinario;