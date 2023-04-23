import { BaseEntity, CreateDateColumn, EntityManager, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class IndexEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  manager?: EntityManager;

  getEntityManager(): EntityManager | undefined {
    return this.manager;
  }

  setEntityManager(manager: EntityManager): void {
    this.manager = manager;
  }
}
