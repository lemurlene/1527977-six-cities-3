export const FormLoginFields = [
  {
    type: 'email',
    name: 'email',
    placeholder: 'Email',
  },
  {
    type: 'password',
    name: 'password',
    placeholder: 'Password',
    pattern: '^(?=.*[A-Za-z])(?=.*\\d)[^\\s]+$',
  },
];
