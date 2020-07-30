import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import Usuario from '../models/Usuario';
import upload from '../config/upload';

interface RequestDTO {
    usuario_id : string;        
    avatarNomeArquivo: string;      
}

export default class AtualizarAvatarUsuario{
    public async execute({usuario_id, avatarNomeArquivo} : RequestDTO ) : Promise<Usuario>{
        const usuarioRepository = getRepository(Usuario);

        const usuario = await usuarioRepository.findOne(usuario_id);

        if(!usuario){
            throw new Error('Somente usuários autenticados podem alterar o avatar');
        }

        // Deletar avatar anterior
        if(usuario.avatar){
            const avatarUsuarioCaminhoArquivo = path.join(upload.directory, usuario.avatar);

            const avatarUsuarioExiste = await fs.promises.stat(avatarUsuarioCaminhoArquivo);

            if(avatarUsuarioExiste){
                await fs.promises.unlink(avatarUsuarioCaminhoArquivo);
            }
        }

        usuario.avatar = avatarNomeArquivo;

        const usuarioAtualizado = await usuarioRepository.save(usuario);

        return usuarioAtualizado;

    }
}