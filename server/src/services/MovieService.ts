import { GenreService } from "./GenreService";
import { GetAllMovies, GetMovieById, GetMovieByName, Movie, PatchMovie, PostMovie } from "../models/movie";
import { User } from "../models/user";
import { z } from "zod";

type MovieWithCreator = Movie & { creator: User }

export class MovieService {
  private genreService = new GenreService();

  async findById(input: GetMovieById): Promise<Movie | undefined> {
    return await Movie.query()
      .findById(input.id)
      .withGraphFetched('[comments.author, genres, publisher]');
  }

  async findByName(input: GetMovieByName): Promise<Movie[]> {
    return await Movie.query()
      .where('name', input.name);
  }

  /**
   * Creates a movie
   *
   * Given a list of genres, associates those genres with the movie. If some of the
   * genres do not exist - they are created and assigned.
   *
   * If any of the queries fail - makes sure that the whole operation is reverted
   * as if it wasn't started at all.
   */
  async create(input: PostMovie): Promise<Movie> {
    const new_movie = { 
      userId: input.userId,
      name: input.name, 
      director: input.director,
      screenwriter: input.screenwriter,
      releaseYear: input.release_year,
      description: input.description,
      trailer_url: input.trailer_url,
      poster_url: input.poster_url
    };
    
    return await Movie.transaction(async trx => {
      const movie = await Movie.query(trx).insert(new_movie);

      if (input.genres) {
        const genres_processed = await Promise.all(
          input.genres.map(genre => this.genreService.findOrCreate(genre, trx))
        );

        await Promise.all(
          genres_processed.map((genre) =>
            trx('movie_genres').insert({ movie_id: movie.id, genre_id: genre.id })
          )
        );
      }

      return movie;
    });
  }

  /**
   * Updates a movie
   *
   * Can change the movie name and user. If any of these isn't provided - the existing
   * value is kept.
   *
   * Also updates the `updated_at` field.
   */
  async update(input: PatchMovie): Promise<Movie> {
    return await Movie.transaction(async trx => {
      
      await Movie.query(trx).where('id', '=', input.id).patch(input);

      const updatedMovie = await Movie.query(trx).findById(input.id);

      if (!updatedMovie) {
        throw new Error(`Movie with id ${input.id} not found`);
      }

      return updatedMovie;
    });
  }

  /**
   * Returns all movies, paginated
   *
   * @param page The page to fetch, pages start at 1
   * @param pageSize The number of movies on each page
   *
   * @returns The movies on the specific page, plus the total number of movies in the database
   */
  async all(
    input: GetAllMovies
  ): Promise<{ movies: Movie[], totalCount: number }> {
    const offset = (input.page - 1) * input.pageSize;
    const pageQuery = await Movie.query()
      .where('name', 'LIKE', `%${input.searchTerm}%`)
      .withGraphFetched('[comments.author, genres, publisher]')
      .offset(offset)
      .limit(input.pageSize);

    const total = (await Movie.query()).length;

    return {movies: pageQuery, totalCount: total};
  }

  /**
   * Returns all movies, paginated, including the creator of each movie
   *
   * @param page The page to fetch, pages start at 1
   * @param pageSize The number of movies on each page
   *
   * @returns The movies on the specific page, plus the total number of movies in the database
   */
  async allWithCreators(
    input: GetAllMovies
  ): Promise<{ movies: MovieWithCreator[], totalCount: number }> {
    const offset = (input.page - 1) * input.pageSize;
    
    const moviesPage = await Movie.query()
      .withGraphFetched('publisher')
      .limit(input.pageSize)
      .offset(offset);

    const total = (await Movie.query()).length;

    return {
      movies: moviesPage as MovieWithCreator[],
      totalCount: total
    };
  }
}

export const movieService = new MovieService();