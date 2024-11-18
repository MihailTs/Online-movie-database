import { MovieCard, MovieModel } from "./MovieCard";
import classes from '../styles/component/MoviesList.module.css';
import { useState } from "react";
import noPoster from '../assets/poster_not_available.jpg'

interface MoviesListProps {
  movies: MovieModel[];
}
  
export function MoviesList({ movies }: MoviesListProps) {
  const [hoveredMoviePoster, setHoveredMoviePoster] = useState<string | undefined>(undefined);

  return (
    <div className={classes.listWithPoster}>
      <ul className={classes.movieList}>
        {movies.map((movie) => (
          <MovieCard 
            movie={movie}
            className={classes.movieCard}
            key={movie.id}
            poster={false}
            onMouseEnter={() => setHoveredMoviePoster(movie.poster_url ?? undefined)}
          ></MovieCard>
        ))}
      </ul>
      <img className={classes.hoveredPoster} src={hoveredMoviePoster ?? noPoster} alt='Hovered Poster'></img>
    </div>
  );
}
  