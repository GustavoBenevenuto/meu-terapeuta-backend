import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AgendamentosRepository from '../repositories/AgendamentosRepository'
import Agendamento from '../models/Agendamento';

interface RequestDTO{
    provedor: string;
    data: Date;
}

export default class CriarAgendamentoService {
    public async execute({provedor, data} : RequestDTO) : Promise<Agendamento> {
        const agendamentosRepository = getCustomRepository(AgendamentosRepository);

        const inicioDaHora = startOfHour(data);

        const buscarData = await agendamentosRepository.buscarPorData(inicioDaHora);
        if (buscarData) {
            throw Error('Este agendamento já está reservado');
        }

        const agendamento = agendamentosRepository.create({
            provedor,
            data: inicioDaHora,
        });

        await agendamentosRepository.save(agendamento);

        return agendamento;
    }
}