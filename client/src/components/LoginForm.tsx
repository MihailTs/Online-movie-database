import { FormEvent, useCallback, useState } from 'react';
import { Button } from '../components/Button';
import classes from '../styles/component/LoginForm.module.css';
import cln from 'classnames';

interface LoginFormProps {
  className?: string;
  onSubmit: (email: string, password: string) => void;
  errorMessage: string | undefined;
   
}

export function LoginForm({ className, onSubmit, errorMessage }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      onSubmit(email, password);
    },
    [email, password]
  );

  return (
    <form className={cln(classes.form, className)} onSubmit={handleSubmit}>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Email"
        className={classes.emailInput}
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        className={classes.passInput}
      />
      {errorMessage? <p className={classes.errorMessage}>{errorMessage}</p>:<></>}
      <Button type="submit" className={classes.button}>
        Login
      </Button>
    </form>
  );
}
