import { FullMovieModel, MovieModel } from "../components/MovieCard";
import { http } from "./http";

export interface MovieCreationData {
  name: string | undefined,
  director: string | undefined,
  screenwriter: string | undefined,
  description: string | undefined,
  release_year?: number | undefined,
  poster_url: string | undefined,
  trailer_url: string | undefined,
  genres: string[]
}

export interface MoviesResponse {
  results: MovieModel[];
  total: number;
}
  
class MovieService {
      
  async loadMovies(
    page: number,
    pageSize: number,
    searchTerm?: string,
  ) {
      
    const { result } = await http.get<MoviesResponse>('/movies', {
      query: { page, pageSize, searchTerm: searchTerm ?? ''},
    });
      
    return result;
  }
        
  async loadSingleMovie(movieId: number) {
    const { result } = await http.get<FullMovieModel>(`/movies/${movieId}`, {});
    
    return result;
  }

  async create(body: MovieCreationData) {
    const { result } = await http.post<FullMovieModel>('/movies/', { body: body as Record<string, any>});

    return result
  }

}

export const movieService = new MovieService();