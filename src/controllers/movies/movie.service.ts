import { Movie } from "../../entities/movie.entity";
import {
  IMovie,
  ISwapApiClient,
  ResourcesType,
} from "../../types/common.types";
import { MovieRepository } from "../../repositories/movie.repository";
import { extractIdFromUrl } from "../../utils/helper.util";
import { CharacterRepository } from "../../repositories/character.repository";
import { Character } from "../../entities/character.entity";
import { IMovieResponse } from "./movies.interface";
import { CommentRepository } from "../../repositories/comment.repository";

export class MovieService {
  private readonly movieRepository;
  private readonly characterRepository;
  private readonly commentRepository;
  private readonly swapClient;

  constructor(
    movieRepository: MovieRepository,
    characterRepository: CharacterRepository,
    commentRepository: CommentRepository,
    swapClient: ISwapApiClient
  ) {
    this.movieRepository = movieRepository;
    this.characterRepository = characterRepository;
    this.commentRepository = commentRepository;

    this.swapClient = swapClient;
  }
  async getMovies(): Promise<[IMovieResponse[] | null, Error]> {
    try {
      const [moviesFromApi, apiError] = await this.swapClient.getMovies();

      if (apiError) throw apiError;
      // write movies fetched to db
      await this.cacheMovies(moviesFromApi);

      // db fetch for with sorted data
      let moviesWithComments = (await this.movieRepository.getMovies(
        {},
        { order: "ASC", sort_by: "release_date" }
      )) as Movie[];

      const responseData: IMovieResponse[] = await Promise.all(
        moviesWithComments.map(async (movie) => {
          let response = {} as IMovieResponse;
          response.id = movie.movie_url_id;
          response.title = movie.title;
          response.opening_crawl = movie.opening_crawl;
          response.release_date = movie.release_date;
          response.comments_count = await this.commentRepository.getCommentsCount(
            { movie_id: movie.id }
          );

          return response;
        })
      );

      return [responseData, null];
    } catch (error) {
      return [null, error];
    }
  }

  private async cacheMovieCharacters(charactersUrl: string[], movieId: number) {
    for (let characterUrl of charactersUrl) {
      let dbCharacter = await this.characterRepository.getCharacter({
        character_url_id: Number(
          extractIdFromUrl(ResourcesType.Characters, characterUrl)
        ),
      });

      if (!dbCharacter) {
        const [characterFromApi, apiError] = await this.swapClient.getCharacter(
          Number(extractIdFromUrl(ResourcesType.Characters, characterUrl))
        );
        if (apiError) throw apiError;

        const characterObj: Partial<Character> = {
          name: characterFromApi.name,
          height: Number.isNaN(Number(characterFromApi.height))
            ? null
            : Number(characterFromApi.height),
          mass: Number.isNaN(Number(characterFromApi.mass))
            ? null
            : Number(characterFromApi.mass),
          hair_color: characterFromApi.hair_color,
          skin_color: characterFromApi.skin_color,
          eye_color: characterFromApi.eye_color,
          birth_year: characterFromApi.birth_year,
          url: characterFromApi.url,
          gender: characterFromApi.gender,
          character_url_id: Number(
            extractIdFromUrl(ResourcesType.Characters, characterUrl)
          ),
        };

        dbCharacter = await this.characterRepository.save(characterObj);
        await this.characterRepository.saveMovieCharacter(
          dbCharacter.id,
          movieId
        );
      }
    }
  }

  private async cacheMovies(movies: IMovie[]) {
    for (let movie of movies) {
      console.log(movie.url);
      console.log(extractIdFromUrl(ResourcesType.Movies, movie.url));

      let dbMovie = await this.movieRepository.getMovie({
        movie_url_id: Number(extractIdFromUrl(ResourcesType.Movies, movie.url)),
      });
      if (!dbMovie) {
        const movieObj: Partial<Movie> = {
          episode_id: Number(movie.episode_id),
          url: movie.url,
          movie_url_id: Number(
            extractIdFromUrl(ResourcesType.Movies, movie.url)
          ),
          opening_crawl: movie.opening_crawl,
          title: movie.title,
          director: movie.director,
          producer: movie.producer,
          release_date: movie.release_date,
          created_at: movie.created,
          updated_at: movie.edited,
        };

        dbMovie = await this.movieRepository.save(movieObj);
      }

      await this.cacheMovieCharacters(movie.characters, dbMovie.id);
    }
    return true;
  }
}
