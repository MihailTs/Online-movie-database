import classes from '../styles/component/CheckBox.module.css'

type CheckBoxProps = {
    value: string;
    isChecked: boolean;
    onToggle: (value: string) => void;
  };
  
export function CheckBox ({ value, isChecked, onToggle }: CheckBoxProps) {
  const handleChange = () => {
    onToggle(value);
  };
  
  return (
    <label className={classes.customCheckbox} htmlFor={value}>
      <input
        id={value}
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        className={classes.checkboxInput} 
      />
      <span className={classes.checkboxSpanCustom}></span>
      {value}
    </label>
  );
};
  