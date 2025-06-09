import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, useSearchParams } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { useAppDispatch } from '../../hooks';
import MainPageWrapper from './main-page-wrapper';
import { Cities, Setting } from '../../const/const';
import type { RootState } from '../../store/type';
import { changeCity } from '../../store/city/city.slice';

vi.mock('./main-page', () => ({
  default: vi.fn(() => <div data-testid="main-page">MainPage</div>),
}));

vi.mock('../../hooks', () => ({
  useAppDispatch: vi.fn(),
}));

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return {
    ...actual,
    useSearchParams: vi.fn(() => {
      const params = new URLSearchParams();
      const setParams = vi.fn();
      return [params, setParams];
    }),
  };
});

const mockedUseAppDispatch = vi.mocked(useAppDispatch);

const createTestStore = (preloadedState?: Partial<RootState>) => configureStore({
  reducer: {
    CITY: () => preloadedState?.CITY || { city: Setting.DefaultCity },
  },
});

describe('MainPageWrapper', () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockedUseAppDispatch.mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render MainPage component', () => {
    const store = createTestStore({
      CITY: {
        currentCity: Setting.DefaultCity
      }
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPageWrapper />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('main-page')).toBeInTheDocument();
  });

  it('should set default city when no city param', () => {
    const mockSetSearchParams = vi.fn();
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams(),
      mockSetSearchParams,
    ]);

    const store = createTestStore({
      CITY: {
        currentCity: Setting.DefaultCity
      }
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPageWrapper />
        </MemoryRouter>
      </Provider>
    );

    expect(mockDispatch).toHaveBeenCalledWith(changeCity(Setting.DefaultCity));
    expect(mockSetSearchParams).toHaveBeenCalledWith({ city: Setting.DefaultCity });
  });

  it('should set city from URL when valid city param exists', () => {
    const testCity = Cities.Dusseldorf;
    const mockSetSearchParams = vi.fn();
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams(`city=${testCity}`),
      mockSetSearchParams,
    ]);

    const store = createTestStore({
      CITY: {
        currentCity: testCity
      }
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MainPageWrapper />
        </MemoryRouter>
      </Provider>
    );

    expect(mockDispatch).toHaveBeenCalledWith(changeCity(testCity));
    expect(mockSetSearchParams).not.toHaveBeenCalled();
  });
});
