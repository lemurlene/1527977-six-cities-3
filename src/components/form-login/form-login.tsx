import InputField from './input';
import { FormLoginFields } from '../../const';

function FormLogin(): JSX.Element {
  return (
    <form className="login__form form" action="#" method="post">
      {FormLoginFields.map((field) => (
        <InputField key={field.name} {...field} />
      ))}
      <button className="login__submit form__submit button" type="submit">Sign in</button>
    </form>
  );
}

export default FormLogin;
