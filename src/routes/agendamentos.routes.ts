import { Router } from 'express';
import { parseISO } from 'date-fns';
import {  getCustomRepository } from 'typeorm';

import AgendamentosRepository from '../repositories/AgendamentosRepository';
import CriarAgendamentoService from '../services/CriarAgendamentoService'

const agendamentosRouter = Router();



agendamentosRouter.get('/', async (request, response) => {
    const agendamentosRepository = getCustomRepository(AgendamentosRepository);
    
    const agendamentos = await agendamentosRepository.find();
    return response.json(agendamentos);
});

agendamentosRouter.post('/', async (request, response) => {
    try {
        const { provedor, data } = request.body;

        const horaConvertida = parseISO(data);

        const criarAgendamentoService = new CriarAgendamentoService();

        const agendamentos = await criarAgendamentoService.execute(
            {
                provedor,
                data: horaConvertida,
            }
        );

        return response.json(agendamentos);
    } catch (err) {
        return response.status(400).json({Erro: err.message});
    }
});

export default agendamentosRouter;