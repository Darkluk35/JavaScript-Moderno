import express from 'express';
import conectarDB from './config/db.js';


const app = express();
conectarDB();

app.get('/', (req,res)=>{
    res.send('Hola mundo los saluda desde express');
});

const PORT = process.env.port || 4000;
app.listen(PORT,()=>{
    console.log('Servidor corriendo en el puerto 4000');
})