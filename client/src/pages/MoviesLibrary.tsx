import { MoviesList } from '../components/MoviesList';
import classes from '../styles/page/MoviesLibrary.module.css';
import { MoviesGrid } from '../components/MoviesGrid';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAsync } from '../hooks/useAsync';
import { MovieModel } from '../components/MovieCard';
import { Button } from '../components/Button';
import { TextInput } from '../components/TextInput';
import { movieService, MoviesResponse } from '../services/movieService';
import { useUserPreferences } from '../contexts/UserPreferences';

export function MoviesLibrary() {
  const LIBRARY_PAGE_SIZE: number = 40;

  const [movies, setMovies] = useState<MovieModel[]>([]);

  const { preferences, setPreferences } = useUserPreferences();
  const isGrid = preferences.view === 'grid';

  const onToggle = () =>
    setPreferences({
      view: isGrid ? 'list' : 'grid',
    });

  const [searchParams, setSearchParams] = useSearchParams();
  
  const searchQuery = searchParams.get('query') || '';
  const pageQuery = searchParams.get('page') || '1';

  const [searchTerm, setSearchTerm] = useState(searchQuery);
  const [inputTerm, setInputTerm] = useState(searchQuery);
  const [page, setPage] = useState(parseInt(pageQuery));
  
  useAsync<MoviesResponse>(
    () => movieService.loadMovies(page, LIBRARY_PAGE_SIZE, searchTerm),
    (movieResp) => setMovies(movieResp as unknown as MovieModel[]),
    [searchTerm, page]
  );

  useEffect(() => {
    setSearchTerm(searchQuery);
  }, [searchQuery]);

  const handleSearch = () => {
    setSearchTerm(inputTerm); 
    setSearchParams({ query: inputTerm, page: '1' });
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    setSearchParams({ query: searchTerm, page: newPage.toString() });
  };

  return (
    <>
      <div className={classes.movieOptions}>
        <Button
          variant='primary'
          className={classes.layoutButton}
          onClick={onToggle}
        >
          {isGrid ? 'list' : 'grid'}
        </Button>
        <div className={classes.pageNavigation}>
          <Button variant='secondary' 
              onClick={() => handlePageChange(page - 1)}
              className={classes.prevButton}
              style={{ visibility: page > 1? 'visible': 'hidden' }}
              >prev</Button>
          <p> page </p>
          <Button variant='secondary'
              onClick={() => handlePageChange(page + 1)}
              className={classes.nextButton}
              style={{ visibility: movies.length === LIBRARY_PAGE_SIZE? 'visible': 'hidden' }}
              >next</Button>
        </div>
        <div className={classes.searchContainer}>
          <TextInput
            className='searchBar'
            type='search'
            placeholder='Search...'
            value={inputTerm}
            onChange={(val) => setInputTerm(val)}
          />
          <Button
            className={classes.searchButton}
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
      </div>
      {isGrid ? <MoviesGrid movies={movies} /> 
              : <MoviesList movies={movies} />
      }
    </>
  );
}