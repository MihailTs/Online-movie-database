import { useParams } from 'react-router-dom';
import { useAsync } from '../hooks/useAsync';
import { useState } from 'react';
import { FullMovieModel } from '../components/MovieCard';
import classes from '../styles/page/MoviePage.module.css'
import noPoster from '../assets/poster_not_available.jpg'
import { movieService } from '../services/movieService';
import StarRating from '../components/StarRating';
import { CommentSection } from '../components/CommentSection';

export function MoviePage() {

  const [movie, setMovie] = useState<FullMovieModel>();
  const { movieId } = useParams<{ movieId: string }>();

  useAsync(() => movieService.loadSingleMovie(parseInt(movieId ?? '')), (res) => setMovie(res));

  return (
    <>
      <div className={classes.moviePage}>
        <div className={classes.posterContainer}>
          <img 
            src={movie?.poster_url ?? noPoster} 
            alt={`${movie?.name} Poster`}
            className={classes.poster}
            onError={(e) => {
              e.currentTarget.src = noPoster;
            }}  />
          <div className={classes.rating}>
            <p>Rating:</p>
            <StarRating rating={movie?.average_rating ?? 0} />
            <p>{movie?.average_rating ?? 'N/A'}</p>
          </div>
        </div>
        <div className={classes.movieDetails}>
          <h1 className={classes.movieTitle}>{movie?.name}</h1>
          <p className={classes.description}>{movie?.description ?? 'No description available'}</p>
          <p className={classes.director}>Director: {movie?.director ?? 'Unknown'}</p>
          <p className={classes.screenwriter}>Screenwriter: {movie?.screenwriter ?? 'Unknown'}</p>
          <p className={classes.releaseYear}>Year: {movie?.release_year ?? 'Unknown'}</p>
          <p className={classes.genres}> 
            Genre: {movie?.genres?.map(genre => genre.name).join(', ') ?? 'Unknown'}
          </p>
          <iframe
              className={classes.trailer}
              src={movie?.trailer_url ?? 'https://www.youtube.com/embed/XqZsoesa55w'}
              title='Movie Trailer'
              allow='picture-in-picture'
              allowFullScreen
          ></iframe>
        </div>
        <CommentSection comments={movie?.comments ?? []} movie={movie}/>
      </div>
    </>
  );
}