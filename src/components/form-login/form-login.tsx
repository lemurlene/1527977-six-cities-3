import Input from './input';
import { FormLoginFields } from '../../const/const';

function FormLogin(): JSX.Element {
  return (
    <form className="login__form form" action="#" method="post">
      {FormLoginFields.map((field) => (
        <Input key={field.name} {...field} />
      ))}
      <button className="login__submit form__submit button" type="submit">Sign in</button>
    </form>
  );
}

export default FormLogin;
