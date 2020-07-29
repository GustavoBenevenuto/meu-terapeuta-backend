import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, IsNull } from 'typeorm';

import Usuario from './Usuario';

@Entity('agendamentos')
export default class Agendamento{
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    provedor_id: string;

    @ManyToOne(() => Usuario)
    @JoinColumn({name: 'provedor_id'})
    provedor: Usuario;

    @Column('time without time zone')
    data: Date;
}