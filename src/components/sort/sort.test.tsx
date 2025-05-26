import { render, screen, fireEvent } from '@testing-library/react';
import Sort from './Sort';

jest.mock('../../store', () => ({
  ...jest.requireActual('../../store'),
  useAppSelector: jest.fn(),
  useAppDispatch: () => jest.fn(),
}));

import { useAppSelector } from '../../store';

const mockSelectSortType = useAppSelector as jest.Mock;

describe('Sort component', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockSelectSortType.mockReturnValue('Price: low to high'); // или другое значение
  });

  it('выводит текущий тип сортировки', () => {
    render(<Sort />);
    expect(screen.getByText(/Price: low to high/)).toBeInTheDocument();
  });

  it('открывает список при клике', () => {
    render(<Sort />);
    const sortTypeSpan = screen.getByText(/Price: low to high/);
    fireEvent.click(sortTypeSpan);
    expect(screen.getByRole('list')).toBeVisible(); // или проверить класс
  });

  it('закрывает список при клике вне', () => {
    render(<Sort />);
    const sortTypeSpan = screen.getByText(/Price: low to high/);
    fireEvent.click(sortTypeSpan);
    // клик вне
    fireEvent.click(document.body);
    // ожидание, что список закрыт
    // можете проверить, что класс убран или элемент исчез
  });

  it('меняет сортировку при выборе другого варианта', () => {
    // Тут нужно мокать dispatch и симулировать клик по пункту
    // Можно найти элемент li по тексту и кликнуть
  });
});
