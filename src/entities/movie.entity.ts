import { Entity, Column } from 'typeorm';
import { IndexEntity } from './index.entity';
import { DbTableName } from '../consts';

@Entity({ name: DbTableName.Movies })
export class Movie extends IndexEntity {
  @Column()
  opening_crawl: string;

  @Column()
  movie_url_id: number;

  @Column()
  episode_id: number;

  @Column()
  title: string;

  @Column()
  director: string;

  @Column()
  url: string;

  @Column()
  producer: string;

  @Column()
  release_date: Date;
}