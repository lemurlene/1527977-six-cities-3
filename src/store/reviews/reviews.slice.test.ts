import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { AppThunkDispatch, extractActionsTypes, makeFakeCard, makeFakeReview } from '../../mock';
import createAPI from '../../services/api';
import { APIRoute } from '../../const/enum';
import { RootState } from '../type';
import { postOfferComment } from '../api-action';

const mockProcessErrorHandle = vi.fn();

describe('Acync actioins', () => {
  const axios = createAPI(mockProcessErrorHandle);
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<RootState, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ REVIEWS: {
      offerComments: [],
      isLoadingComments: false,
      isLoadingComment: false,
    } });
  });

  describe('postOfferComment slice', () => {
    const mockOffer = makeFakeCard();
    const mockReview = makeFakeReview();
    const route = `${APIRoute.Comments}/${mockOffer.id}`;
    it('should dispatch postOfferComment.pending and postOfferComment.fulfilled when server response 200', async () => {

      mockAxiosAdapter.onPost(route).reply(200, mockReview);

      await store.dispatch(postOfferComment({
        id: mockOffer.id,
        comment: {
          rating: mockReview.rating,
          review: mockReview.comment,
        }
      })
      );

      const emmitedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emmitedActions);
      const postOfferCommentFulfilled = emmitedActions.at(1) as ReturnType<typeof postOfferComment.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        postOfferComment.pending.type,
        postOfferComment.fulfilled.type,
      ]);

      expect(postOfferCommentFulfilled.payload).toEqual(mockReview);
    });

    it('should dispatch postOfferComment.pending and postOfferComment.rejected when server response 400', async () => {
      mockAxiosAdapter.onPost(route).reply(400);

      await store.dispatch(postOfferComment({
        id: mockOffer.id,
        comment: {
          rating: mockReview.rating,
          review: mockReview.comment,
        }
      })
      );
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postOfferComment.pending.type,
        postOfferComment.rejected.type,
      ]);
    });
  });
});
