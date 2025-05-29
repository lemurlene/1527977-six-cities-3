import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError, AxiosHeaders } from 'axios';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import createAPI from './api';
import { getToken } from './token';

vi.mock('./token', () => ({
  getToken: vi.fn(),
}));

type MockAxiosInstance = AxiosInstance & {
  _requestInterceptor?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig;
  _responseInterceptor?: {
    onFulfilled?: (response: AxiosResponse) => AxiosResponse;
    onRejected?: (error: AxiosError) => Promise<never>;
  };
};

describe('API Client', () => {
  const mockProcessError = vi.fn();
  let api: MockAxiosInstance;

  beforeEach(() => {
    vi.clearAllMocks();


    vi.mocked(axios.create).mockImplementation((config) => {
      const instance = axios.create(config) as MockAxiosInstance;

      const originalRequestUse = instance.interceptors.request.use.bind(instance.interceptors.request);
      instance.interceptors.request.use = vi.fn((onFulfilled) => {
        if (onFulfilled) {
          instance._requestInterceptor = (config) => onFulfilled(config) || config;
        }
        return originalRequestUse(onFulfilled);
      });

      // Перехватываем response interceptor
      const originalResponseUse = instance.interceptors.response.use.bind(instance.interceptors.response);
      instance.interceptors.response.use = vi.fn((onFulfilled, onRejected) => {
        if (onFulfilled || onRejected) {
          instance._responseInterceptor = {
            onFulfilled: onFulfilled ? (response) => onFulfilled(response) || response : undefined,
            onRejected: onRejected || undefined
          };
        }
        return originalResponseUse(onFulfilled, onRejected);
      });

      return instance;
    });

    api = createAPI(mockProcessError) as MockAxiosInstance;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Configuration', () => {
    it('should create axios instance with correct config', () => {
      expect(vi.mocked(axios.create)).toHaveBeenCalled();
    });
  });

  describe('Request interceptor', () => {
    it('should add token to headers when token exists', () => {
      const testToken = 'test-token';
      vi.mocked(getToken).mockReturnValue(testToken);

      const config: InternalAxiosRequestConfig = {
        headers: new AxiosHeaders()
      };
      const result = api._requestInterceptor?.(config);

      expect(result?.headers?.get('X-Token')).toBe(testToken);
    });

    it('should not add token when it is not available', () => {
      vi.mocked(getToken).mockReturnValue(undefined);

      const config: InternalAxiosRequestConfig = {
        headers: new AxiosHeaders()
      };
      const result = api._requestInterceptor?.(config);

      expect(result?.headers?.get('X-Token')).toBeUndefined();
    });
  });

  describe('Response interceptor', () => {
    it('should handle error response', async () => {
      const error: AxiosError = {
        config: {} as InternalAxiosRequestConfig,
        isAxiosError: true,
        name: 'TestError',
        message: 'Test message',
        response: {
          status: 400,
          statusText: 'Bad Request',
          data: { message: 'Error message' },
          headers: {},
          config: {} as InternalAxiosRequestConfig
        },
        toJSON: () => ({})
      };

      try {
        await api._responseInterceptor?.onRejected?.(error);
        expect.fail('Should have thrown an error');
      } catch (e) {
        expect(mockProcessError).toHaveBeenCalledWith('Error message');
        expect(e).toBe(error);
      }
    });

    it('should not process success responses', () => {
      const response: AxiosResponse = {
        data: {},
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig
      };

      const result = api._responseInterceptor?.onFulfilled?.(response);
      expect(result).toBe(response);
    });
  });
});
