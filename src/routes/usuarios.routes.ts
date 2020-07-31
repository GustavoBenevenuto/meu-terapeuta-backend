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
    const { nome, email, senha } = request.body;

    const criarUsuarioService = new CriarUsuarioService();

    const senhaEncriptada = await hash(senha, 8);

    const usuario = await criarUsuarioService.execute(
        { nome, email, senha: senhaEncriptada });

    return response.json(usuario);
});

usuariosRoutes.patch('/avatar', garantirAutenticacao, upload.single('avatar'), async (request, response) => {
    console.log(request.file);
    const atualizarAvatar = new AtualizarAvatarUsuario();

    const usuario = await atualizarAvatar.execute({
        usuario_id: request.usuario.id,
        avatarNomeArquivo: request.file.filename,
    })

    return response.json(usuario.avatar);
});

export default usuariosRoutes;