import { MigrationInterface, QueryRunner } from 'typeorm';

export class CommentsMigration1682209880683 implements MigrationInterface {
  name = 'CommentsMigration1682209880683';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "comment" (
      "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
      "comment" character(500) NOT NULL,
      "ip" character varying NOT NULL,
      "movie_id" uuid NOT NULL,
      "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28b2" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "comment"`);
  }
}
