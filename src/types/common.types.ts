import type { NextFunction, Request, Response } from "express";


export interface IMovie {
  characters: string[];
  created: Date;
  director: string;
  edited: Date;
  episode_id: string;
  opening_crawl: string;
  planets: string[] | IPlanet[];
  producer: string;
  release_date: Date;
  species: string[] | ISpecie[];
  starships: string[] | IStarship[];
  title: string;
  url: string;
  vehicles: string[] | IVehicle[];
}
export interface ICharacter {
  birth_year: string;
  eye_color: string;
  films: string[] | IMovie[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string | IPlanet;
  mass: string;
  name: string;
  skin_color: string;
  created: Date;
  edited: Date;
  species: string[] | ISpecie[];
  starships: string[] | IStarship[];
  url: string;
  vehicles: string[] | IVehicle[];
}
export interface IPlanet {
  climate: string;
  created: Date;
  diameter: string;
  edited: Date;
  films: string[] | IMovie[];
  gravity: string;
  name: string;
  orbital_period: string;
  population: string;
  residents: string[] | ICharacter[];
  rotation_period: string;
  surface_water: string;
  terrain: string;
  url: string;
}
export interface ISpecie {
  average_height: string;
  average_lifespan: string;
  classification: string;
  created: Date;
  designation: string;
  edited: Date;
  eye_colors: string;
  hair_colors: string;
  homeworld: string | IPlanet;
  language: string;
  name: string;
  people: string[] | ICharacter[];
  films: string[] | IMovie[];
  skin_colors: string;
  url: string;
}
export interface IStarship {
  MGLT: string;
  cargo_capacity: string;
  consumables: string;
  cost_in_credits: string;
  created: Date;
  crew: string;
  edited: Date;
  hyperdrive_rating: string;
  length: string;
  manufacturer: string;
  max_atmosphering_speed: string;
  model: string;
  name: string;
  passengers: string;
  films: string[] | IMovie[];
  pilots: string[] | ICharacter[];
  starship_class: string;
  url: string;
}
export interface IVehicle {
  cargo_capacity: string;
  consumables: string;
  cost_in_credits: string;
  created: Date;
  crew: string;
  edited: Date;
  length: string;
  manufacturer: string;
  max_atmosphering_speed: string;
  model: string;
  name: string;
  passengers: string;
  pilots: string[] | ICharacter[];
  films: string[] | IMovie[];
  url: string;
  vehicle_class: string;
}

export enum ResourcesType {
  Movies = 'films',
  Characters = 'people',
  Planets = 'planets',
  Species = 'species',
  Starships = 'starships',
  Vehicles = 'vehicles',
}

export type IHttpRequest = {
  hosturl: string;
  url?: string;
  headers?: Record<string, string>;
  payload?: Record<string, string>,
  endpoint: string,
  method: 'post' | 'get' | 'put' | 'delete'
}

export type IHttpResponse = {
  data: Record<string, any>
  status: number;
}

export type IQueryOptions = {
  skip?: number;
  limit?: number;
  sort_by?: string;
  order?: 'asc' | 'desc';
}

export type IResourceFilter = {
  comment_id?: string,
  comment_ip?: string,
  episode_id?: number,
  character_url_id?: string;
  movie_url_id?: string;
  character_gender?: string;
  movie_id?: string;
  id?: string,
}

export type IComment = {
  comment: string;
  ip: string;
};

export type ISwapApiClient = {
  getMovies: () => Promise<[IMovie[] | null, Error | null]>;
  getMovie: () => Promise<[IMovie, Error]>;
  getCharacters: () => Promise<[ICharacter[], Error]>;
  getCharacter: (id: number) => Promise<[ICharacter, Error]>;
}

export type IMovieController = {
  getMovies: (req: Request, res: Response, next: NextFunction) => void;
};

export type ICharactersController = {
  getCharacters: (req: Request, res: Response, next: NextFunction) => void;
};



