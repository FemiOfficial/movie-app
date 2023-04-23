export interface IAddComment {
  comment: string;
  ip: string;
  movie_id: string;
}

export interface ICommentData {
  created_at: Date;
  updated_at: Date;
  comment: string;
  ip: string;
  movie_id: number;
}


export interface ICommentResponse {
    data: ICommentData[];
    meta: {
      page: number,
      limit: number,
      next: number,
      total_count: number;
    };
  }
  