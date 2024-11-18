import { useCallback, useState } from 'react';
import { authService } from '../services/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import classes from '../styles/page/LoginPage.module.css';
import { LoginForm } from '../components/LoginForm';
import { AuthorizationError } from '../services/http';

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [error, setError] = useState<unknown>(undefined);

  const locationState = location.state as { location: string } | null;
  const cameFrom = locationState?.location;

  const onSubmit = useCallback(async (email: string, password: string) => {
    try {
      await authService.login({ email, password });
      navigate(cameFrom ?? '/');
    } catch (err) {
      setError(err);
    }
  }, [cameFrom, navigate]);

  return (
    <div className={classes.container}>
      <div className={classes.problemMessage}>
        <LoginForm 
          className={classes.form} 
          onSubmit={onSubmit} 
          errorMessage={errorToMessage(error)}/>
      </div>
    </div>
  );
}

function errorToMessage(error: unknown): string | undefined{
  if (!error) return undefined;

  if (error instanceof AuthorizationError) {
    return 'Invalid credentials';
  }
  
  return 'Ooops, something went wrong, please try again later.';
}