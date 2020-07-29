import { Router } from 'express';
import { hash } from 'bcryptjs';

import CriarUsuarioService from '../services/CriarUsuarioService';

const usuariosRoutes = Router();

usuariosRoutes.post('/', async (request, response) => {
    try {
        const { nome, email, senha } = request.body;

        const criarUsuarioService = new CriarUsuarioService();

        const senhaEncriptada = await hash(senha, 8);

        const usuario = await criarUsuarioService.execute(
            { nome, email, senha: senhaEncriptada });

        return response.json(usuario);
    } catch (error) {
        return response.status(400).json({erro: error.message});
    }
});

export default usuariosRoutes;