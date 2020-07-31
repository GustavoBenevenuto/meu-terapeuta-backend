import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AgendamentosRepository from '../repositories/AgendamentosRepository';
import CriarAgendamentoService from '../services/CriarAgendamentoService'
import garantirAutenticacao from '../middlewares/garantirAutenticacao';

const agendamentosRouter = Router();

agendamentosRouter.use(garantirAutenticacao);

agendamentosRouter.get('/', async (request, response) => {
    const agendamentosRepository = getCustomRepository(AgendamentosRepository);

    console.log('/agendamentos ' + request.usuario.id);

    const agendamentos = await agendamentosRepository.find();
    return response.json(agendamentos);
});

agendamentosRouter.post('/', async (request, response) => {
    const { provedor_id, data } = request.body;

    const horaConvertida = parseISO(data);

    const criarAgendamentoService = new CriarAgendamentoService();

    const agendamentos = await criarAgendamentoService.execute(
        {
            provedor_id,
            data: horaConvertida,
        }
    );

    return response.json(agendamentos);

});

export default agendamentosRouter;