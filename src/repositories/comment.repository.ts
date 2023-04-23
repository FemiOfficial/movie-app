import { IResourceFilter } from "../types/common.types";
import AppDataSource from "../db/datasource";
import { Comment } from "../entities/comment.entity";
import { FindOptionsWhere } from "typeorm";

export class CommentRepository {
  private readonly repository = AppDataSource.getRepository(Comment);
  async save(comment: Partial<Comment>): Promise<Comment | undefined> {
    return await this.repository.save(comment);
  }

  async getComments(filter: IResourceFilter): Promise<Comment[] | undefined> {
    return await this.repository.find({ where: this.getFilterQuery(filter) });
  }

  async getCommentsCount(filter: IResourceFilter): Promise<number | undefined> {
    return await this.repository.createQueryBuilder().where(this.getFilterQuery(filter)).getCount();
  }

  async getComment(filter: IResourceFilter) {
    return await this.repository.findOne({
      where: this.getFilterQuery(filter),
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
