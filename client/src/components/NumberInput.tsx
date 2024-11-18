import classes from '../styles/component/NumberInput.module.css';

type BaseInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

interface NumberInputProps extends Omit<BaseInputProps, 'onChange'> {
  value: number;
  onChange: (val: number) => void;
  errors?: string[];
}

export function NumberInput({
  value,
  onChange,
  errors,
  ...rest
}: NumberInputProps) {
  return (
    <>
      <input
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        {...rest}
      />
      {errors && <span className={classes.error}>{errors.join(', ')}</span>}
    </>
  );
}
