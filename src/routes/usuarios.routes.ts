import { Router } from 'express';
import { hash } from 'bcryptjs';
import multer from 'multer';

import CriarUsuarioService from '../services/CriarUsuarioService';
import uploadConfig from '../config/upload';
import garantirAutenticacao from '../middlewares/garantirAutenticacao';
import AtualizarAvatarUsuario from '../services/AtualizarAvatarUsuario';

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
    try {
        console.log(request.file);
        const atualizarAvatar = new AtualizarAvatarUsuario();

        const usuario = await atualizarAvatar.execute({
            usuario_id: request.usuario.id,
            avatarNomeArquivo: request.file.filename,
        })

        return response.json(usuario.avatar);
    } catch (error) {
        return response.json({ Erro: error.message });
    }
});

export default usuariosRoutes;