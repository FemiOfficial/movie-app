import { MigrationInterface, QueryRunner } from 'typeorm';

export class CharactersMigration1682210458616 implements MigrationInterface {
  name = 'CharactersMigration1682210458616';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "character" (
      "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
      "character_url_id" integer NOT NULL,
      "name" character varying NOT NULL,
      "height" numeric(18, 2),
      "mass" numeric(18, 2),
      "hair_color" character varying,
      "skin_color" character varying,
      "eye_color" character varying,
      "birth_year" character varying,
      "url" character varying NOT NULL,
      "gender" character varying,
      "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c2092" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "character"`);
  }
}
