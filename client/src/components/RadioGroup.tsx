export interface RadioOptions {
  label: string;
  value: string;
}
  
interface RadioGroupProps {
  options: RadioOptions[];
  onChange: (value: string) => void;
  value: string;
  className?: string;
}
  
export function RadioGroup({ value, options, onChange, className }: RadioGroupProps) {
  return (
    <div className={className}>
      {options.map((option) => (
        <label key={`radio-button-${option.value}`}>
          {option.label}
          <input
            type='radio'
            value={option.value}
            onChange={(e) => onChange(e.target.value)}
            checked={value === option.value}
          />
        </label>
      ))}
    </div>
  );
}
  