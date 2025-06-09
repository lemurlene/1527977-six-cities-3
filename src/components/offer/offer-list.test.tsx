import { render, screen } from '@testing-library/react';
import { useLocation } from 'react-router-dom';
import { Location } from 'react-router';
import { useAppSelector } from '../../hooks';
import { getState } from './utils';
import OfferListMemo from './offer-list';
import { makeFakeCard } from '../../mocks/mocks';
import { CardType } from '../../const/type';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useLocation: vi.fn() as unknown as jest.MockedFunction<() => Location>,
  };
});

vi.mock('../../hooks', () => ({
  useAppSelector: vi.fn(),
}));

vi.mock('./utils', () => ({
  getState: vi.fn(),
}));

vi.mock('./card', () => ({
  __esModule: true,
  default: ({ card }: { card: CardType }) => <div data-testid="card">{card.title}</div>,
}));

describe('OfferList component', () => {
  const mockedUseLocation = useLocation as jest.Mock;
  const mockedUseAppSelector = useAppSelector as jest.Mock;
  const mockedGetState = getState as jest.Mock;

  beforeEach(() => {
    mockedUseLocation.mockReturnValue({ pathname: '/' });
    mockedUseAppSelector.mockReturnValue('Popular');
    mockedGetState.mockReturnValue({ offerListClass: 'cities' });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders correct number of cards', () => {
    const offers = [
      makeFakeCard({ cityKey: 'Paris' }),
      makeFakeCard({ cityKey: 'Paris', isFavorite: true }),
      makeFakeCard({ cityKey: 'Cologne' }),
    ];

    render(<OfferListMemo offers={offers} cardsCount={2} />);

    const cards = screen.getAllByTestId('card');
    expect(cards).toHaveLength(2);
  });

  it('applies correct class from getState', () => {
    mockedGetState.mockReturnValueOnce({ offerListClass: 'favorites' });

    const offers = [makeFakeCard()];

    render(<OfferListMemo offers={offers} />);

    const container = screen.getByTestId('card').parentElement;
    expect(container?.className).toContain('favorites');
  });

  it('renders all offers if cardsCount not set', () => {
    const offers = [
      makeFakeCard(),
      makeFakeCard(),
      makeFakeCard(),
      makeFakeCard(),
    ];

    render(<OfferListMemo offers={offers} />);

    const cards = screen.getAllByTestId('card');
    expect(cards.length).toBe(offers.length);
  });
});
