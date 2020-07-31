import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AgendamentosRepository from '../repositories/AgendamentosRepository'
import Agendamento from '../models/Agendamento';
import AppError from '../errors/AppError';

interface RequestDTO{
    provedor_id: string;
    data: Date;
}

export default class CriarAgendamentoService {
    public async execute({provedor_id, data} : RequestDTO) : Promise<Agendamento> {
        const agendamentosRepository = getCustomRepository(AgendamentosRepository);

        const inicioDaHora = startOfHour(data);

        const buscarData = await agendamentosRepository.buscarPorData(inicioDaHora);
        if (buscarData) {
            throw new AppError('Este agendamento já está reservado');
        }

        const agendamento = agendamentosRepository.create({
            provedor_id,
            data: inicioDaHora,
        });

        await agendamentosRepository.save(agendamento);

        return agendamento;
    }
}