import { FormEvent, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAction } from '../../store/api-action';
import { useAppDispatch } from '../../hooks';
import Input from './input';
import { AppRoute } from '../../const/enum';
import { FormLoginFields } from './const';

function FormLogin(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const refs = {
    email: useRef<HTMLInputElement | null>(null),
    password: useRef<HTMLInputElement | null>(null),
  };

  const handleSubmitForm = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const email = refs.email.current?.value;
    const password = refs.password.current?.value;

    if (email && password) {
      dispatch(loginAction({
        login: email,
        password: password
      }))
        .then((response) => {
          if (response.meta.requestStatus === 'fulfilled') {
            navigate(AppRoute.Root);
          }
        });
    }
  };

  return (
    <form className="login__form form" action="#" method="post" onSubmit={handleSubmitForm}>
      {FormLoginFields.map((field) => (
        <Input
          key={field.name}
          {...field}
          ref={refs[field.name as keyof typeof refs]}
        />
      ))}
      <button className="login__submit form__submit button" type="submit">Sign in</button>
    </form>
  );
}

export default FormLogin;
