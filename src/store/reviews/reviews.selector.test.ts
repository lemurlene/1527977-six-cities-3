import { selectOffersComments, selectCommentsOffersStatus, selectCommentStatus } from './reviews.selector';
import { NameSpace } from '../const';
import { ReviewType } from '../../const/type';
import { State } from '../type';
import { makeFakeReview } from '../../mocks/mocks';

describe('Review selectors with mocks', () => {
  const mockReviews: ReviewType[] = [
    makeFakeReview({ date: '2025-01-01T12:00:00Z' }),
    makeFakeReview({ date: '2025-02-01T15:30:00Z' }),
  ];

  const mockState: State = {
    [NameSpace.Reviews]: {
      offerComments: mockReviews,
      isLoadingComments: true,
      isLoadingComment: false,
    },
  } as unknown as State;

  it('selectOffersComments returns array of reviews', () => {
    expect(selectOffersComments(mockState)).toEqual(mockReviews);
  });

  it('selectCommentsOffersStatus returns isLoadingComments', () => {
    expect(selectCommentsOffersStatus(mockState)).toBe(true);
  });

  it('selectCommentStatus returns isLoadingComment', () => {
    expect(selectCommentStatus(mockState)).toBe(false);
  });
});
