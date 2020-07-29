import { Request, Response, NextFunction, request } from 'express';
import { verify } from 'jsonwebtoken';
import autenticacao from '../config/autenticacao';

interface TokenPayload {

    iat: number,
    exp: number,
    sub: string;

}

export default function garantirAutenticacao(
    request: Request,
    response: Response,
    next: NextFunction
): void {

    const cabecalhoAutenticacao = request.headers.authorization;

    if (!cabecalhoAutenticacao) {
        throw new Error('O token está ausente');
    }

    const [tipo, token] = cabecalhoAutenticacao.split(' ');

    try {
        const tokenDecodificado = verify(token, autenticacao.jwt.secret);

        const { sub } = tokenDecodificado as TokenPayload;

        request.usuario = {
            id: sub,
        }

        return next();

    } catch (error) {
        throw new Error('Token inválido');
    }
} 