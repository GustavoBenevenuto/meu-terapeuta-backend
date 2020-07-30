import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import { request } from 'express';

const pastaTemp = path.resolve(__dirname, '..','..','temp');

export default {
    directory: pastaTemp,
    storage: multer.diskStorage({
        destination: pastaTemp,
        filename: (request, file, calback) => {
            const hashArquivo = crypto.randomBytes(8).toString('hex');

            const nomeArquivo = `${hashArquivo}-${file.originalname}`

            return calback(null, nomeArquivo);
        }
    })
}