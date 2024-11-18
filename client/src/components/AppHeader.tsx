import { Link, useNavigate } from 'react-router-dom';
import classes from '../styles/component/AppHeader.module.css';
import { authService } from '../services/auth';
import { Button } from './Button';
import { ThemeSelector } from './ThemeSelector';
import { useCurrentUser } from '../contexts/CurrentUser';

export function AppHeader() {
  const user = useCurrentUser();
  
  const navigate = useNavigate();
  const navigationLog = user? '/': '/login';

  return (
    <header className={classes.header}>
      <Link to="/">
        <h1 className={classes.title} >CineWorld</h1>
      </Link>
      <div>
        <ThemeSelector className={classes.themeSelector}/>
      </div>
      <div className={classes.userSection}>
          <p className={classes.username}>{user?.firstName ?? ''}</p>
          <Button
            className={classes.logButton}
            variant={user? 'accent':'secondary'}
            onClick={() => {
              authService.logout();
              navigate(navigationLog);
            }}>
              {user? 'Logout': 'Login'}
          </Button>
          <Button
            className={classes.signUpButton}
            variant='secondary'
            style={{ visibility: user? 'hidden': 'visible'}}
            onClick={() => {
              navigate('/signup');
            }}>
              SignUp
          </Button>
      </div>
    </header>
  );
}