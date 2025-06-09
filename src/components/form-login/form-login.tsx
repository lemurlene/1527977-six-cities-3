import { FormEvent, useRef, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectLoadingLogin } from '../../store/user/user.selector';
import { loginAction } from '../../store/api-action';
import { useAppDispatch } from '../../hooks';
import Input from './input';
import { AppRoute } from '../../const/enum';
import { FormLoginFields } from './const';

function FormLogin(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoadingLoginStatus = useSelector(selectLoadingLogin);

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
    <form
      className="login__form form"
      action="#"
      method="post"
      onSubmit={handleSubmitForm}
      data-testid="form-login"
    >
      {FormLoginFields.map((field) => (
        <Input
          key={field.name}
          {...field}
          ref={refs[field.name as keyof typeof refs]}
          disabled={isLoadingLoginStatus}
        />
      ))}
      <button
        className="login__submit form__submit button"
        type="submit"
        disabled={isLoadingLoginStatus}
      >Sign in
      </button>
    </form>
  );
}

const FormLoginMemo = memo(FormLogin);

export default FormLoginMemo;
