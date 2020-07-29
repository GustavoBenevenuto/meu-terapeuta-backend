import { getRepository } from 'typeorm';

import Usuario from '../models/Usuario';
import { request } from 'express';

interface RequestDTO {
    nome: string;
    email: string;
    senha: string;
}

export default class CriaUsuarioService {
    public async execute({ nome, email, senha }: RequestDTO): Promise<Usuario> {

        const usuarioRepository = getRepository(Usuario);

        const usuarioExiste = await usuarioRepository.findOne(
            {
                where: {
                    email: email
                }
            });

        if (usuarioExiste) {
            throw new Error('Este e-mail já está sendo usado');
        }

        const user = usuarioRepository.create(
            {
                nome,
                email,
                senha,
            }
        );

        await usuarioRepository.save(user);

        return user;
    }
}