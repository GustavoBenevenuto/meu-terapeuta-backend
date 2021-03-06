import { Router } from 'express';

import CriaSessaoService from '../services/CriaSessaoService';

const sessaoRouter = Router();

sessaoRouter.post('/', async (request, response) => {
    const { email, senha } = request.body;

    const criaSessao = new CriaSessaoService();

    const { usuario, token } = await criaSessao.execute({ email, senha });

    delete usuario.senha;

    return response.json({ usuario, token });
});

export default sessaoRouter;