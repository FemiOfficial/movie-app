import { MigrationInterface, QueryRunner } from 'typeorm';

export class MovieCharactersMigration1682210593598 implements MigrationInterface {
  name = 'MovieCharactersMigration1682210593598';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "movie_character" (
      "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
      "movie_id" uuid NOT NULL,
      "character_id" uuid NOT NULL,
      "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      CONSTRAINT "PK_f1be7cf3a5714dbc6bb4e1c28b2" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "movie_character"`);
  }
}
