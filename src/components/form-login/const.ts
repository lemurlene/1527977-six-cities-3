export const FormLoginFields = [
  {
    type: 'email',
    name: 'email',
    placeholder: 'Email',
    title: 'Введите адрес Вашей электронной почты'
  },
  {
    type: 'password',
    name: 'password',
    placeholder: 'Password',
    pattern: '^(?=.*[A-Za-z])(?=.*\\d)[^\\s]+$',
    title: 'Введите минимум одну букву и цифру без пробелов'
  },
];
