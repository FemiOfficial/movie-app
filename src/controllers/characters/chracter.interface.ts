export interface ICharacterResponseData {
  id: number;
  name: string;
  gender: string;
  height: number;
  mass: number;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
}

export interface ICharacterResponse {
  data: ICharacterResponseData[];
  meta: {
    page: number,
    limit: number,
    next: number,
    total_count: number;
    total_height: string | null;
  };
}
