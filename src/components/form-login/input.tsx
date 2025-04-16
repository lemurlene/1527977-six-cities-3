import { forwardRef } from 'react';

type InputProps = {
  type: string;
  name: string;
  placeholder: string;
  pattern?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, name, placeholder, pattern }, ref) => (
    <div className="login__input-wrapper form__input-wrapper">
      <label className="visually-hidden">{placeholder}</label>
      <input
        className="login__input form__input"
        type={type}
        name={name}
        placeholder={placeholder}
        required
        pattern={pattern}
        ref={ref}
      />
    </div>
  )
);

Input.displayName = 'Input';

export default Input;
