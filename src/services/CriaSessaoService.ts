import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import Usuario from '../models/Usuario';
import sessaoRouter from '../routes/sessao.routes';

interface RequestDTO {
    email: string;
    senha: string;
}

interface Response {
    usuario: Usuario;
    token: string;
}

export default class CriaSessaoService {
    public async execute({ email, senha }: RequestDTO): Promise<Response> {
        const usuarioRepository = getRepository(Usuario);

        const usuario = await usuarioRepository.findOne({
            where: { email: email }
        });

        if(!usuario){
            throw new Error('E-mail ou senha incorretas');
        }

        const senhaValida = await compare(senha, usuario.senha);

        if(!senhaValida){
            throw new Error('E-mail ou senha incorretas');
        }

        //Gerar Token
        const token = sign(
            {},
            'fb361a4e627b35989c6b04954e20638d',
            {
                subject: usuario.id,
                expiresIn: '1d'
            }
        )

        return {
            usuario,
            token
        };
    }
}