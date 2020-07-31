import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import routes from './routes';
import './database';
import AppError from './errors/AppError';

const app = express();

app.use(express.json());

app.use(routes);

app.use((error : Error,  request : Request, response : Response, next : NextFunction ) => {
    if(error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.message,
        });
    }

    console.error(error);

    return response.status(500).json({
        status: 'error',
        message: 'Erro do Servidor Interno',
    })
});

app.listen(3333,() => {
    console.log('--------------------------------------');
    console.log('Servidor Rodando');
    console.log('http://localhost:3333');
    console.log('--------------------------------------');
});