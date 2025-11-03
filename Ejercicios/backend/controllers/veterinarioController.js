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

const confirmar = async (req,res)=>{
    const {token} = req.params;
    const usuarioConfirmar = await Veterinario.findOne({token});
    
if(!usuarioConfirmar){
    const error = new Error('Token no valido');
    return res.status(404).json({msg:error.message});
}

try {
    usuarioConfirmar.token = null
    usuarioConfirmar.confirmado = true;
    await usuarioConfirmar.save();
    res.json({msg:'Usuario confirmado correctamente'});
} catch (error) {
    console.log(error);    
}
    
    
}

const perfil = (req,res)=>{
    res.json({msg:'Mostrando Perfil'});
}

export {registrar,perfil, confirmar};
