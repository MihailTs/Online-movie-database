import { http } from "./http";

export interface GenreModel {
  id: number;
  name: string;
}

export interface GenresResponse {
  results: GenreModel[];
  total: number;
}
  
class GenreService {
      
  async loadGenres() {
    const { result } = await http.get<GenresResponse>('/genres', {});
      
    return result as any as GenreModel[];
  }
        
}

export const genreService = new GenreService();