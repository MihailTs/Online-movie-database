import classes from '../styles/page/EntryPage.module.css'
import { AuthLink } from '../components/AuthLink';
import { useCurrentUser } from '../contexts/CurrentUser';

export function EntryPage() {
  const user = useCurrentUser();

  return (
    <>
      <h1 className={classes.pageTitle}>Welcome to CineWorld</h1>
      <div className={classes.menu}>
        <AuthLink 
          to='/movies/library'
          isAuthenticated={user ? true : false}
        >Movies Library</AuthLink>
        <br/>
        <AuthLink 
          to='/movies/add-movie'
          isAuthenticated={user ? true : false}
        >    Add movie</AuthLink>
      </div>
    </>
  );
}