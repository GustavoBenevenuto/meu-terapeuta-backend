import {MigrationInterface, QueryRunner} from "typeorm";

export class AdicionarCampoDeAvatarNaTabelaUsuarios1596133956465 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE usuario ADD avatar varchar;');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE usuario DROP COLUMN avatar');
    }

}
