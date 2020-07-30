import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterarTipoDataNaTabelaAgendamentos1596130375733 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE agendamentos ALTER COLUMN data TYPE timestamptz USING current_date + data;');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE agendamentos ALTER COLUMN data TYPE time USING (data::time);');
    }

}
