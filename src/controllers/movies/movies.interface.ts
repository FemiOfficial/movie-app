export interface IMovieResponse {
  id: number | string;
  opening_crawl: string;
  movie_url_id? : number;
  title: string;
  release_date: Date;
  comments_count: number;
}
