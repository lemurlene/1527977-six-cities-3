import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { withStore } from '../../mocks/mock-component';
import Sort from './sort';
import { SortTypes } from './const';
import { MemoryRouter } from 'react-router-dom';

describe('Sort component', () => {
  const initialStore = {
    SORT: {
      currentSortType: SortTypes.Popular
    }
  };

  it('should render correctly with default sort type', () => {
    const { withStoreComponent } = withStore(
      <MemoryRouter>
        <Sort />
      </MemoryRouter>,
      initialStore
    );

    render(withStoreComponent);

    expect(screen.getByText('Sort by')).toBeInTheDocument();
    expect(screen.getByTestId('sort-type')).toHaveTextContent(SortTypes.Popular);
    expect(screen.getByTestId('sort-options')).not.toHaveClass('places__options--opened');
  });

  it('should open/close sort options when clicking on sort type', async () => {
    const { withStoreComponent } = withStore(
      <MemoryRouter>
        <Sort />
      </MemoryRouter>,
      initialStore
    );

    render(withStoreComponent);
    const sortType = screen.getByTestId('sort-type');

    await userEvent.click(sortType);
    expect(screen.getByTestId('sort-options')).toHaveClass('places__options--opened');

    await userEvent.click(sortType);
    expect(screen.getByTestId('sort-options')).not.toHaveClass('places__options--opened');
  });

  it('should display all sort options', () => {
    const { withStoreComponent } = withStore(
      <MemoryRouter>
        <Sort />
      </MemoryRouter>,
      initialStore
    );

    render(withStoreComponent);

    const options = screen.getAllByRole('listitem');
    expect(options).toHaveLength(Object.values(SortTypes).length);
  });

  it('should close sort options when clicking outside', async () => {
    const { withStoreComponent } = withStore(
      <MemoryRouter>
        <div>
          <Sort />
          <div data-testid="outside-element">Outside element</div>
        </div>
      </MemoryRouter>,
      initialStore
    );

    render(withStoreComponent);
    const sortType = screen.getByTestId('sort-type');

    await userEvent.click(sortType);
    expect(screen.getByTestId('sort-options')).toHaveClass('places__options--opened');

    await userEvent.click(screen.getByTestId('outside-element'));
    expect(screen.getByTestId('sort-options')).not.toHaveClass('places__options--opened');
  });

  it('should highlight current sort type', () => {
    const currentType = SortTypes.Top;
    const { withStoreComponent } = withStore(
      <MemoryRouter>
        <Sort />
      </MemoryRouter>,
      {
        SORT: {
          currentSortType: currentType
        }
      }
    );

    render(withStoreComponent);

    const sortOptions = screen.getByTestId('sort-options');

    const activeOption = sortOptions.querySelector('.places__option--active');
    expect(activeOption).toBeInTheDocument();
  });
});
