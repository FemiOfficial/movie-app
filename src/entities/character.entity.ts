import { Entity, Column } from 'typeorm';
import { IndexEntity } from './index.entity';
import { DbTableName } from '../consts';

@Entity({ name: DbTableName.Characters })
export class Character extends IndexEntity {
  @Column()
  name: string;

  @Column()
  height: number;

  @Column()
  character_url_id: number;

  @Column()
  mass: number;

  @Column()
  hair_color: string;

  @Column()
  skin_color: string;

  @Column()
  eye_color: string;

  @Column()
  birth_year: string;

  @Column()
  url: string;

  @Column()
  gender: string;
}