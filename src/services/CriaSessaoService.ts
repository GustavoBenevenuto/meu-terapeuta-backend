import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import Usuario from '../models/Usuario';
import autenticacao from '../config/autenticacao';


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
            autenticacao.jwt.secret,
            {
                subject: usuario.id,
                expiresIn: autenticacao.jwt.expiresIn
            }
        )

        return {
            usuario,
            token
        };
    }
}