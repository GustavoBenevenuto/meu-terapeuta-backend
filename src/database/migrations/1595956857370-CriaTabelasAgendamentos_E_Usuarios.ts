import {MigrationInterface, QueryRunner} from "typeorm";

export class CriaTabelasAgendamentosEUsuarios1595956857370 implements MigrationInterface {
    name = 'CriaTabelasAgendamentosEUsuarios1595956857370'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "usuario" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, "email" character varying NOT NULL, "senha" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a56c58e5cabaa04fb2c98d2d7e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "agendamentos" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "provedor_id" uuid NULL, "data" TIME NOT NULL, CONSTRAINT "PK_3890b7448ebc7efdfd1d43bf0c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "agendamentos" ADD CONSTRAINT "FK_dcc7f640ac4ac77b110fd4a4c19" FOREIGN KEY ("provedor_id") REFERENCES "usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "agendamentos" DROP CONSTRAINT "FK_dcc7f640ac4ac77b110fd4a4c19"`);
        await queryRunner.query(`DROP TABLE "agendamentos"`);
        await queryRunner.query(`DROP TABLE "usuario"`);
    }

}
