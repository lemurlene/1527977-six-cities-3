type InputProps = {
  type: string;
  name: string;
  placeholder: string;
}

function Input({ type, name, placeholder }: InputProps): JSX.Element {
  return (
    <div className="login__input-wrapper form__input-wrapper">
      <label className="visually-hidden">{placeholder}</label>
      <input
        className="login__input form__input"
        type={type}
        name={name}
        placeholder={placeholder}
        required
      />
    </div>
  );
}

export default Input;
