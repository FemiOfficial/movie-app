import { HTTP } from "../consts";
import {
  ICharacter,
  IHttpRequest,
  IMovie,
  ISwapApiClient,
} from "../types/common.types";
import { ConfigHelper } from "../utils/config/config.helpers";
import { ConfigKeys } from "../utils/config/config.key";
import { HttpClient } from "../utils/http-client";

export const swapEndpoint = {
  movie: "/films",
  character: "/people",
};

export const SwapApiClient = (
  httpClient: HttpClient,
  configHelper: ConfigHelper
): ISwapApiClient => {
  return {
    async getMovies(): Promise<[IMovie[] | null, Error | null]> {
      try {
        const request: IHttpRequest = {
          hosturl: configHelper.getStringOrError(ConfigKeys.SWAP_BASE_URL),
          endpoint: swapEndpoint.movie,
          method: "get",
        };

        const response = await httpClient.send(request);

        if (response.status !== HTTP.OK) {
          throw response;
        }
        const movies = response.data.results as IMovie[];
        return [movies, null];
      } catch (error) {
        return [null, error];
      }
    },
    async getMovie(id: number): Promise<[IMovie, Error]> {
      try {
        const request: IHttpRequest = {
          hosturl: configHelper.getStringOrError(ConfigKeys.SWAP_BASE_URL),
          endpoint: `${swapEndpoint.movie}/${id}`,
          method: "get",
        };

        const response = await httpClient.send(request);

        if (response.status !== HTTP.OK) {
          throw response;
        }
        const movie = response.data as IMovie;
        return [movie, null];
      } catch (error) {
        return [null, error];
      }
    },
    async getCharacters(): Promise<[ICharacter[], Error]> {
      try {
        const request: IHttpRequest = {
          hosturl: configHelper.getStringOrError(ConfigKeys.SWAP_BASE_URL),
          endpoint: swapEndpoint.character,
          method: "get",
        };
    
        const response = await httpClient.send(request);

        if (response.status !== HTTP.OK) {
          throw response;
        }
        const character = response.data as ICharacter[];
        return [character, null];
      } catch (error) {
        return [null, error];
      }
    },
    async getCharacter(id: number): Promise<[ICharacter, Error]> {
      try {
        const request: IHttpRequest = {
          hosturl: configHelper.getStringOrError(ConfigKeys.SWAP_BASE_URL),
          endpoint: `${swapEndpoint.character}/${id}`,
          method: "get",
        };
    
        const response = await httpClient.send(request);

        if (response.status !== HTTP.OK) {
          throw response;
        }
        const character = response.data as ICharacter;
        return [character, null];
      } catch (error) {
        return [null, error];
      }
    },
  };
};
