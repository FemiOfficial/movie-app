import { MigrationInterface, QueryRunner } from 'typeorm';

export class MoviesMigration1682209354744 implements MigrationInterface {
  name = 'MoviesMigration1682209354744';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "movie" (
      "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
      "movie_url_id" integer NOT NULL,
      "episode_id" integer NOT NULL,
      "opening_crawl" character varying NOT NULL,
      "title" character varying NOT NULL,
      "url" character varying NOT NULL,
      "director" character varying NOT NULL,
      "producer" character varying NOT NULL,
      "release_date" TIMESTAMP WITH TIME ZONE NOT NULL,
      "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "movie"`);
  }
}
