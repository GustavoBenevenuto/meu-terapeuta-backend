import { Request, Response, NextFunction, request } from 'express';
import { verify } from 'jsonwebtoken';
import autenticacao from '../config/autenticacao';
import AppError from '../errors/AppError';

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
        throw new AppError('O token está ausente',401);
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
        throw new AppError('Token inválido',401);
    }
} 