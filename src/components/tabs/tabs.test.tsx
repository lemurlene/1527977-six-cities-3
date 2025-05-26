import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Tabs from './tabs';
import { Cities, Setting } from '../../const/const';
import { changeCity } from '../../store/city/city.slice';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const initialState = {
  CITY: {
    currentCity: Setting.DefaultCity,
  },
};
const store = mockStore(initialState);

describe('Tabs component', () => {
  it('renders all cities and correctly highlights the active', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/?city=${Setting.DefaultCity}`]}>
          <Routes>
            <Route path="*" element={<Tabs />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    Object.values(Cities).forEach((city) => {
      expect(screen.getByText(city)).toBeInTheDocument();
    });

    const activeLink = screen.getByText(Setting.DefaultCity).closest('a');
    expect(activeLink).toHaveClass('tabs__item--active');

    const nonActiveLink = screen.getByText('Cologne').closest('a');
    expect(nonActiveLink).not.toHaveClass('tabs__item--active');
  });

  it('when you click on a city, changeCity dispatches and changes searchParams', async () => {

    store.dispatch = vi.fn();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/?city=${Setting.DefaultCity}`]}>
          <Routes>
            <Route path="*" element={<Tabs />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const cologneLink = screen.getByText('Cologne');
    await userEvent.click(cologneLink);

    expect(store.dispatch).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith(changeCity('Cologne'));
  });
});
