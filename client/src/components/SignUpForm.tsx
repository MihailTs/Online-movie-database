import { FormEvent, useState } from 'react';
import classes from '../styles/component/SignUpForm.module.css'
import { Button } from './Button';
import { TextInput } from './TextInput';
import { useNavigate } from 'react-router-dom';
import { useAsyncAction } from '../hooks/useAsyncAction';
import { ValidationError } from '../services/http';
import { UserCreationData, userService } from '../services/userService';

export function SignUpForm() {
    const [input, setInput] = useState<UserCreationData>({
      name: '',
      email: '',
      password: ''
    });

    const navigate = useNavigate();

    const {
      loading,
      error,
      trigger: onSubmit,
    } = useAsyncAction(async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const data = await userService.create(input);
      navigate(`/`);
    });
  
    console.log(loading, error);
  
    return (
      <form className={classes.form} onSubmit={onSubmit}>
        <label htmlFor='name'>Username:</label>
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
        <label htmlFor='email'>E-mail:</label>
        <TextInput
          type='text'
          id='email'
          name='email'
          value={input.email ?? ''}
          onChange={(val) => setInput((i) => ({ ...i, email: val }))}
          required
          errors={
            error instanceof ValidationError
              ? error.fieldErrors.title
              : undefined
          }
        />
        <label htmlFor='password'>Password:</label>
        <TextInput
          type='password'
          id='password'
          name='password'
          value={input.password ?? ''}
          onChange={(val) => setInput((i) => ({ ...i, password: val }))}
          required
          errors={
            error instanceof ValidationError
              ? error.fieldErrors.title
              : undefined
          }
        />
        <Button
            type='submit'
            variant='primary'
            className={classes.submitButton}>
          SignUp
        </Button>
      </form>
    );
  }
  