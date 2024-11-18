import classes from '../styles/page/AddMoviePage.module.css';
import { AddMovieForm } from '../components/AddMovieForm';

export default function AddMoviePage() {
  return (
    <div className={classes.addMoviePage}>
      <h1>Add a New Movie</h1>
      <AddMovieForm/>
    </div>
  );
}
