import express from 'express';
import conectarDB from './config/db.js';
import veterinarioRoutes from './routes/veterinarioRoutes.js';


const app = express();

app.use(express.json());


conectarDB();

app.use('/api/veterinarios',veterinarioRoutes);

const PORT = process.env.port || 4000;
app.listen(PORT,()=>{
    console.log('Servidor corriendo en el puerto 4000');
})