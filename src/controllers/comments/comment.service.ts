import {
  IAddComment,
  ICommentData,
  ICommentResponse,
} from "./comment.interface";
import {
  ICharacter,
  IMovie,
  IQueryOptions,
  IResourceFilter,
  ISwapApiClient,
  ResourcesType,
} from "../../types/common.types";
import { CommentRepository } from "../../repositories/comment.repository";
export class CommentService {
  private readonly commentRepository;

  constructor(commentRepository: CommentRepository) {
    this.commentRepository = commentRepository;
  }

  async addComment(comment: IAddComment): Promise<[ICommentData | null, Error | null]> {
    try {
      const commentSaved = await this.commentRepository.save(comment);
      return [commentSaved, null];
    } catch (error) {
      return [null, error];
    }
  }

  async getComments(
    filter: IResourceFilter,
    options: IQueryOptions
  ): Promise<[ICommentResponse | null, Error | null]> {
    try {
      let comments = (await this.commentRepository.getComments(
        filter,
        options
      )) as ICommentData[];

      const allWithCriteria = await this.commentRepository.getCommentWithMovie(filter);
      const response = {
        data: comments,
        meta: {
          page: options.skip / options.limit,
          limit: options.limit,
          next: options.skip / options.limit + 1,
          previous: options.skip > 0 ? options.skip / options.limit - 1 : null,
          total_count: allWithCriteria.length,
        },
      };
      return [response, null];
    } catch (error) {
      return [null, error];
    }
  }
}
