import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { withStore } from '../../mocks/mock-component';
import SortOption from './sort-option';
import userEvent from '@testing-library/user-event';

describe('SortOption component', () => {
  it('should render correctly with inactive state', () => {
    const mockSortType = 'Popular';
    const { withStoreComponent } = withStore(
      <SortOption isCurrent={false} sortType={mockSortType} />
    );

    render(withStoreComponent);

    const option = screen.getByRole('listitem');
    expect(option).toBeInTheDocument();
    expect(option).toHaveTextContent(mockSortType);
    expect(option).toHaveClass('places__option');
    expect(option).not.toHaveClass('places__option--active');
  });

  it('should render correctly with active state', () => {
    const mockSortType = 'Price: low to high';
    const { withStoreComponent } = withStore(
      <SortOption isCurrent sortType={mockSortType} />
    );

    render(withStoreComponent);

    const option = screen.getByRole('listitem');
    expect(option).toHaveClass('places__option');
    expect(option).toHaveClass('places__option--active');
  });
});

describe('SortOption actions', () => {
  it('should dispatch changeSort action when clicked', async () => {
    const mockSortType = 'Price: high to low';
    const { withStoreComponent, mockStore } = withStore(
      <SortOption isCurrent={false} sortType={mockSortType} />
    );

    render(withStoreComponent);

    const option = screen.getByRole('listitem');
    await userEvent.click(option);

    const actions = mockStore.getActions();
    expect(actions[0]).toEqual({
      type: 'SORT/changeSort',
      payload: mockSortType
    });
  });
});

describe('SortOption accessibility', () => {
  it('should be focusable and clickable', async () => {
    const mockSortType = 'Top rated first';
    const { withStoreComponent, mockStore } = withStore(
      <SortOption isCurrent={false} sortType={mockSortType} />
    );

    render(withStoreComponent);

    const option = screen.getByRole('listitem');
    expect(option).toHaveAttribute('tabindex', '0');

    option.focus();
    expect(option).toHaveFocus();

    await userEvent.click(option);

    const actions = mockStore.getActions();
    expect(actions).toHaveLength(1);
    expect(actions[0].type).toBe('SORT/changeSort');
  });
});
