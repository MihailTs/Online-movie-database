import { MouseEventHandler, useState } from 'react';
import classes from '../styles/component/MovieCard.module.css';
import downArrow from '../assets/down-arrow.svg';
import { Link } from 'react-router-dom';
import noPoster from '../assets/poster_not_available.jpg'
import { MovieComment } from './CommentCard';

export interface MovieGenre {
  name: string;
}

export interface MovieModel {
  id: number;
  name: string;
  director?: string;
  screenwriter?: string;
  genres?: MovieGenre[];
  release_year?: number;
  poster_url?: string;
  average_rating?: number;
  comments?: MovieComment[];
}

export interface FullMovieModel extends MovieModel {
  description?: string,
  trailer_url?: string
}

interface MovieCardProps extends Omit<React.HTMLProps<HTMLDivElement>, 'poster'>{
  movie: MovieModel;
  key: number;
  poster: boolean;
}

export function MovieCard({ movie, poster, onMouseEnter}: MovieCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsExpanded((isExpanded) => !isExpanded);
  }
  
  return <>
    <Link to={`/movies/movie-page/${movie.id}`}>
      <li className={classes.title}>  
        <div 
          className={`${classes.movieCard} ${isExpanded ? classes.movieCardExpanded : ''}`}
          onMouseEnter={onMouseEnter}
          >
          {poster? <img 
                      src={movie.poster_url ?? noPoster}
                      className={classes.poster}
                      onError={(e) => {
                        e.currentTarget.src = noPoster;
                      }}></img> : <></>}
          <h3 className={classes.movieTitle} title={movie.name}>{movie.name}</h3>
          <button className={classes.arrowButton} onClick={handleButtonClick}>
            <img 
              className={`${classes.arrow} ${isExpanded ? classes.arrowExpanded : ''}`} 
              src={downArrow} 
              alt="Down Arrow"
            />
          </button>
          {isExpanded? <>
            <p>Director: { movie.director ?? 'unknown' }</p>
            <p>Screenwriter: { movie.screenwriter ?? 'unknown' }</p>
            <p>Genre: { movie.genres?.map((genre) => genre.name).join(', ') ?? 'unknown'}</p>
            <p>Year: { movie.release_year ?? 'unknown'}</p>
            <p>Rating: { movie.average_rating }</p>
            </> : <></>
          }
        </div>        
      </li>
    </Link>
  </>
}