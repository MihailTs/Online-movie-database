import { FormEvent, useCallback, useState } from 'react';
import classes from '../styles/component/AddMovieForm.module.css'
import { Button } from './Button';
import { TextInput } from './TextInput';
import { TextArea } from './TextArea';
import { useNavigate } from 'react-router-dom';
import { useAsyncAction } from '../hooks/useAsyncAction';
import { MovieCreationData, movieService } from '../services/movieService';
import { NumberInput } from './NumberInput';
import { ValidationError } from '../services/http';
import { GenreModel, genreService } from '../services/genreService';
import { useAsync } from '../hooks/useAsync';
import { CheckBox } from './CheckBox';

export function AddMovieForm() {
    const [input, setInput] = useState<MovieCreationData>({
      name: '',
      director: undefined,
      screenwriter: undefined,
      description: undefined,
      release_year: undefined,
      poster_url: undefined,
      trailer_url: undefined,
      genres: []
    });

    const [allowedGenres, setAllowedGenres] = useState<GenreModel[]>();

    useAsync(() => genreService.loadGenres(), (res) => setAllowedGenres(res));

    const navigate = useNavigate();

    const handleCheckBoxToggle = useCallback(
      (genre: string) => {
        setInput((prev) =>
          prev.genres.includes(genre)
            ? { ...prev, genres: prev.genres.filter((g) => g !== genre) }
            : { ...prev, genres: [...prev.genres, genre] }
        );
      },
      [setInput]
    );

    console.log(input.genres);

    const {
      error,
      trigger: onSubmit,
    } = useAsyncAction(async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const data = await movieService.create(input);
  
      navigate(`/movies/movie-page/${data.id}`);
    });
    
    return (
      <form className={classes.form} onSubmit={onSubmit}>
        <label htmlFor='name'>Movie Name:</label>
        <TextInput
          type='text'
          id='name'
          name='name'
          value={input.name ?? ''}
          onChange={(val) => setInput((i) => ({ ...i, name: val }))}
          required
          errors={
            error instanceof ValidationError
              ? error.fieldErrors.title
              : undefined
          }
        />
  
        <label htmlFor='director'>Director:</label>
        <TextInput
          type='text'
          id='director'
          name='director'
          value={input.director ?? ''}
          onChange={(val) => setInput((i) => ({ ...i, director: val }))}
          errors={
            error instanceof ValidationError
              ? error.fieldErrors.title
              : undefined
          }
        />
  
        <label htmlFor='screenwriter'>Screenwriter:</label>
        <TextInput
          type='text'
          id='screenwriter'
          name='screenwriter'
          value={input.screenwriter ?? ''}
          onChange={(val) => setInput((i) => ({ ...i, screenwriter: val }))}
          errors={
            error instanceof ValidationError
              ? error.fieldErrors.title
              : undefined
          }
        />

      <label>Genres:</label>
        <div className={classes.genreCheckBoxes}>
          {allowedGenres?.map((genre) => 
            <CheckBox 
              value={genre.name} 
              isChecked={false} 
              key={genre.id}
              onToggle={handleCheckBoxToggle}
            />)
          }
        </div>

        <label htmlFor='releaseYear'>Release Year:</label>
        <NumberInput
          type='number'
          id='releaseYear'
          name='releaseYear'
          min='1900'
          max={new Date().getFullYear() + 2}
          onWheel={(e) => e.currentTarget.blur()}
          value={input.release_year ?? 1900}
          onChange={(val) => setInput((i) => ({ ...i, release_year: Number(val) }))}
          errors={
            error instanceof ValidationError
              ? error.fieldErrors.title
              : undefined
          }
        />
  
        <label htmlFor='description'>Description:</label>
        <TextArea
          id='description'
          name='description'
          value={input.description ?? ''}
          onChange={(val) => setInput((i) => ({ ...i, description: val }))}
          rows={4}
          errors={
            error instanceof ValidationError
              ? error.fieldErrors.title
              : undefined
          }
        ></TextArea>
  
        <label htmlFor='posterUrl'>Poster URL:</label>
        <TextInput
          type='text'
          id='posterUrl'
          name='posterUrl'
          value={input.poster_url ?? ''}
          onChange={(val) => setInput((i) => ({ ...i, poster_url: val }))}
        />
  
        <label htmlFor='trailerUrl'>Trailer URL:</label>
        <TextInput
          type='text'
          id='trailerUrl'
          name='trailerUrl'
          value={input.trailer_url ?? ''}
          onChange={(val) => setInput((i) => ({ ...i, trailer_url: val }))}
        />
  
        <Button
            type='submit'
            variant='primary'
            className={classes.submitButton}>
          Add Movie
        </Button>
      </form>
    );
  }
  