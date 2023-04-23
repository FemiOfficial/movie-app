import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { IndexEntity } from './index.entity';
import { Character } from './character.entity';
import { Movie } from './movie.entity';
import { DbTableName } from '../consts';

@Entity({ name: DbTableName.MovieCharacters })
export class MovieCharacter extends IndexEntity {
  @Column()
  movie_id: number;

  @Column()
  character_id: number;
 
  @ManyToOne(
    () => Movie,
  )
  @JoinColumn({ name: 'movie_id' })
  movie: Movie;

  @ManyToOne(
    () => Character,
  )
  @JoinColumn({ name: 'character_id' })
  character: Character;
}