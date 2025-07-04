import { StatusCodes } from 'http-status-codes';

export const BASE_URL = 'https://15.design.htmlacademy.pro/six-cities';
export const SERVER_TIMEOUT = 5000;
export const AUTH_TOKEN_NAME = 'six-cities-token';
export const ERROR_TIMEOUT = 3000;

export const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.UNAUTHORIZED]: true,
};
