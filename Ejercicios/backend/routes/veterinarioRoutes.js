import express from 'express';
import { registrar, perfil , confirmar ,autenticar,olvidePassword, comprobarPassword, nuevaPassword} from '../controllers/veterinarioController.js';
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

//Area publica
router.post('/',registrar);
router.get('/confirmar/:token',confirmar);
router.post('/login',autenticar);
router.post('/olvide-password',olvidePassword);
router.route('/olvide-password/:token').get(comprobarPassword).post(nuevaPassword);
//Area privada
router.get('/perfil',checkAuth,perfil);

export default router;