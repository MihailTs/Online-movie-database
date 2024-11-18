import classes from '../styles/component/TextInput.module.css';
import cln from 'classnames';

type BaseInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

interface TextInputProps extends Omit<BaseInputProps, 'onChange'> {
  value: string;
  onChange: (val: string) => void;
  errors?: string[];
}

export function TextInput({
  className,
  value,
  onChange,
  errors,
  ...rest
}: TextInputProps) {
  return (
    <>
      <input
        value={value}
        className={cln(classes.input, className)}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        {...rest}
      />
      {errors && <span>{errors.join(', ')}</span>}
    </>
  );
}