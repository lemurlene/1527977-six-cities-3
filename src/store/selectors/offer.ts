import type { RootState } from '../type';

const selectOffer = (state: RootState) => state.offer;
const selectOfferLoading = (state: RootState) => state.isLoadingOffer;
const selectOffersNear = (state: RootState) => state.offersNear;
const selectOffersNearLoading = (state: RootState):boolean => state.isLoadingOffersNear;
const selectOffersComments = (state: RootState) => state.offerComments;
const selectOffersCommentsLoading = (state: RootState) => state.isLoadingOffersComments;
const selectCommentSending = (state: RootState):boolean => state.isLoadingComment;

export { selectOffer, selectOfferLoading, selectOffersNear, selectOffersNearLoading, selectOffersComments,
  selectOffersCommentsLoading, selectCommentSending };
