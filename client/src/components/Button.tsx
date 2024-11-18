import classes from '../styles/component/Button.module.css';
import cln from 'classnames';

type BaseButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export type ButtonVariant = 'primary' | 'secondary' | 'accent';

interface ButtonProps extends BaseButtonProps {
  variant?: ButtonVariant;
}

export function Button({
  className,
  children,
  variant = 'primary',
  ...baseButtonProps
}: ButtonProps) {
  return (
    <button
      className={cln(classes.button, classes[variant], className)}
      {...baseButtonProps}
    >
      {children}
    </button>
  );
}
