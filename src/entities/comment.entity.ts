import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { IndexEntity } from './index.entity';
import { Movie } from './movie.entity';
import { DbTableName } from '../consts';

@Entity({ name: DbTableName.Comments })
export class Comment extends IndexEntity {
  @Column()
  comment: string;

  @Column()
  ip: string;

  @Column()
  movie_id: string;

  @ManyToOne(
    () => Movie,
  )
  @JoinColumn({ name: 'movie_id' })
  movie: Movie;
}