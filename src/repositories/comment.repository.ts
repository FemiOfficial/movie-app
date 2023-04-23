import { IQueryOptions, IResourceFilter } from "../types/common.types";
import AppDataSource from "../db/datasource";
import { Comment } from "../entities/comment.entity";
import { FindOptionsWhere } from "typeorm";
import { DbTableName } from "../consts";

export class CommentRepository {
  private readonly repository = AppDataSource.getRepository(Comment);
  async save(comment: Partial<Comment>): Promise<Comment | undefined> {
    return await this.repository.save(comment);
  }
  
  async getCommentWithMovie(filter: IResourceFilter = {}, options: IQueryOptions = {}): Promise<Comment[] | undefined> {
    return await this.repository
      .createQueryBuilder(DbTableName.Comments)
      .where(this.getFilterQuery(filter))
      .orderBy({ 'comment.created_at': 'DESC'})
      .limit(options.limit).offset(options.skip)
      .getMany();
  }

  async getComments(filter: IResourceFilter = {}, options: IQueryOptions = {}): Promise<Comment[] | undefined> {
    return await this.repository
      .createQueryBuilder(DbTableName.Comments)
      .select('comment', 'created_at')
      .where(this.getFilterQuery(filter))
      .addSelect('ip')
      .addSelect('id')
      .addSelect('updated_at')
      .orderBy({ created_at: 'DESC'})
      .limit(options.limit).offset(options.skip)
      .getMany();
  }

  async getCommentsCount(filter: IResourceFilter = {}): Promise<number | undefined> {
    return await this.repository.createQueryBuilder().where(this.getFilterQuery(filter)).getCount();
  }

  async getComment(filter: IResourceFilter) {
    // return  await this.repository.createQueryBuilder().select('comment created_at ip id updated_at').where(this.getFilterQuery(filter))
    return await this.repository.findOne({
      where: this.getFilterQuery(filter), select: ['comment','created_at', 'ip', 'id', 'updated_at'],
    });
  }

  getFilterQuery(filter: IResourceFilter) {
    const { comment_id, movie_id, comment_ip, id } = filter;
    const query: FindOptionsWhere<Comment> = {};
    if (id) {
      query.id = id;
    }
    if (comment_id) {
      query.id = comment_id;
    }

    if (movie_id) {
      query.movie_id = movie_id;
    }

    if (comment_ip) query.ip = comment_ip;
    return query;
  }
}

export const createCommentRepository = () => new CommentRepository();
