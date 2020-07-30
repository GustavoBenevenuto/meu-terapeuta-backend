import { Router } from 'express';
import { hash } from 'bcryptjs';
import multer from 'multer';

import CriarUsuarioService from '../services/CriarUsuarioService';
import uploadConfig from '../config/upload';
import garantirAutenticacao from '../middlewares/garantirAutenticacao';

const usuariosRoutes = Router();
const upload = multer(uploadConfig);


usuariosRoutes.post('/', async (request, response) => {
    try {
        const { nome, email, senha } = request.body;

        const criarUsuarioService = new CriarUsuarioService();

        const senhaEncriptada = await hash(senha, 8);

        const usuario = await criarUsuarioService.execute(
            { nome, email, senha: senhaEncriptada });

        return response.json(usuario);
    } catch (error) {
        return response.status(400).json({ erro: error.message });
    }
});

usuariosRoutes.patch('/avatar', garantirAutenticacao, upload.single('avatar'), async (request, response) => {
    console.log(request.file);
    // if (!request.file) {
    //     return response.json({ status: 'erro' });
    // }
    return response.json({ status: 'sucesso' })
});

export default usuariosRoutes;