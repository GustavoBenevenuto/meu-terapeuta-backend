import Agendamento from '../models/Agendamento';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Agendamento)
export default class AgendamentosRepository extends Repository<Agendamento>{
    
    public async buscarPorData(data: Date): Promise<Agendamento | null>{
        const buscarData = await this.findOne({
            where:{
                data: data
            }
        })
        
        return buscarData || null;
    }
}