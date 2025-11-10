import Veterinario from '../models/veterinario.js';
import generarJWT from '../helpers/generarJWT.js';
import generarId from '../helpers/generarId.js';
import emailRegistro from '../helpers/emailRegistro.js'
import emailOlvidePassword from '../helpers/emailOlvidePassword.js';
import veterinario from '../models/veterinario.js';


////////////////////////////////////////////////////////////////////////////////////////
const registrar = async(req,res)=>{
    const {email,nombre} = req.body;
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

    //Enviar email
    emailRegistro({
        email,
        nombre,
        token: veterinarioGuardado.token
    });


    res.json(veterinarioGuardado);
    
} catch (error) {
    console.log(error);
}}
//////////////////////////////////////////////////////////////////////////////////////////
const confirmar = async (req,res)=>{
    const {token} = req.params;
    console.log('🧭 Token recibido:', token);
    const usuarioConfirmar = await Veterinario.findOne({token});
    
if(!usuarioConfirmar){
    const error = new Error('Token no valido');
    return res.status(404).json({msg:error.message});
}

try {
    usuarioConfirmar.token = null
    usuarioConfirmar.confirmado = true;
    await usuarioConfirmar.save();
    console.log('✅ Usuario confirmado correctamente');
    res.json({ msg: 'Usuario confirmado correctamente' });
} catch (error) {
    console.log('❌ Error al confirmar:', error);
    res.status(500).json({ msg: 'Error en el servidor' });  
}
    
    
}
///////////////////////////////////////////////////////////////////////////////////////////
const perfil = (req,res)=>{
    const {veterinario} = req;
    res.json({perfil: veterinario});
}
////////////////////////////////////////////////////////////////////////////////////////////
const autenticar = async(req,res)=>{
    const {email,password} = req.body;
//Comprobar si el usuario existe
    const usuario = await Veterinario.findOne({email});
    if(!usuario){
        const error = new Error('El usuario no existe');
        return res.status(404).json({msg:error.message});
    }
//Comprobar si el usuario esta confirmado
    if(!usuario.confirmado){
        const error = new Error('Tu cuenta no ha sido confirmada');
        return res.status(403).json({msg:error.message});
    }
//Comprobar el password
    if(await usuario.comprobarPassword(password)){
        //Autenticar al usuario
        res.json({token:generarJWT(usuario.id)});
    }else{
        const error = new Error('El password es incorrecto');
        return res.status(403).json({msg:error.message});
    }
}
///////////////////////////////////////////////////////////////////////////////////////////
const olvidePassword = async(req,res)=>{
    const {email} = req.body;
    const existeUsuario = await Veterinario.findOne({email})
    if(!existeUsuario){
        const error = new Error('El usuario no existe');
        return res.status(400).json({msg:error.message});
}
try {
    existeUsuario.token = generarId();
    await existeUsuario.save();
    //Email con instrucciones
    emailOlvidePassword({
        email,
        nombre: existeUsuario.nombre,
        token: existeUsuario.token
    })
    res.json({msg:'Hemos enviado un email con las instrucciones'});
} catch (error) {
    console.log(error);
}
}
//////////////////////////////////////////////////////////////////////////////////////////
const comprobarPassword = async(req,res)=>{
    const {token} = req.params;
    const tokenValido = await Veterinario.findOne({token});
    if(tokenValido){
        res.json({msg:'Token valido y el usuario existe'});
    }else{
        const error = new Error('Token no valido');
        return res.status(400).json({msg:error.message});
    }

//////////////////////////////////////////////////////////////////////////////////////////
}
const nuevaPassword = async(req,res)=>{
    const {token} = req.params;
    const {password} = req.body;
    const veterinario = await Veterinario.findOne({token});
    if(!veterinario){
        const error = new Error('Hubo un error');
        return res.status(400).json({msg:error.message});
    }
    try {
        veterinario.token = null;
        veterinario.password = password;
        await veterinario.save();
        res.json({msg:'Password modificado correctamente'});
    } catch (error) {
        console.log(error);
    }
}

export {registrar,perfil, confirmar, autenticar,olvidePassword,comprobarPassword,nuevaPassword};
