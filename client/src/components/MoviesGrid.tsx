import { MovieCard, MovieModel } from './MovieCard';
import classes from '../styles/component/MoviesGrid.module.css';

interface MoviesGridProps {
  movies: MovieModel[];
}

export function MoviesGrid({ movies }: MoviesGridProps) {

  return (
    <ul className={classes.movieGrid}>
      {movies?.map((movie) => (
        <MovieCard 
          movie={movie}
          key={movie.id}
          className={classes.movieCard}
          poster={true}/>
      ))}
    </ul>
  );
}