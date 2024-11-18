import cln from 'classnames';
import classes from '../styles/component/TextArea.module.css'

type BaseTextAreaProps = React.
DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>,
                                                 HTMLTextAreaElement>

interface TextAreaProps extends Omit<BaseTextAreaProps, 'onChange'> {
  value: string;
  onChange: (val: string) => void;
  errors?: string[];
}

export function TextArea({
  className,
  value,
  onChange,
  errors,
  ...rest
  }: TextAreaProps) {
    return (
        <>
          <textarea 
            value={value}
            className={cln(classes.input, className)}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
            {...rest}
          />
          {errors && <span>{errors.join(', ')}</span>}
        </>
    )
}