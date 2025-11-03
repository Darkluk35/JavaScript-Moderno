import Veterinario from '../models/veterinario.js';


const registrar = async(req,res)=>{
    const {email} = req.body;
//Prevenir el duplicado de usuarios

const existeUsuario = await Veterinario.findOne({email})
if(existeUsuario){
    const error = new Error('Usuario ya registrado')
    return res.status(400).json({msg:error.message});
}

try {
    //Guardar un veterinario
    const veterinario = new Veterinario(req.body);
    const veterinarioGuardado = await veterinario.save();
    res.json({msg:'Registrando usuario...'});
    
} catch (error) {
    console.log(error);
}
    //const {nombre,email,password} = req.body;
    //console.log({email});
    //console.log({password})
    //console.log({nombre})
}

const perfil = (req,res)=>{
    res.json({msg:'Mostrando Perfil'});
}

export {registrar,perfil};
