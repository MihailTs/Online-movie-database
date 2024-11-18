import { SignUpForm } from '../components/SignUpForm';
import classes from '../styles/page/SignUpPage.module.css'

export default function SignUpPage() {
    return (
      <div className={classes.signUpPage}>
        <h1>Sign up</h1>
        <SignUpForm/>
      </div>
    );
  }
  