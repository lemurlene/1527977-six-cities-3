import { AUTH_TOKEN_NAME } from './const';
import { Token } from './type';

const getToken = (): Token => localStorage.getItem(AUTH_TOKEN_NAME) ?? '';

const saveToken = (token: Token): void => localStorage.setItem(AUTH_TOKEN_NAME, token);

const dropToken = (): void => localStorage.removeItem(AUTH_TOKEN_NAME);

export { getToken, saveToken, dropToken };
