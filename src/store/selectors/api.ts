import type { RootState } from '../type';

const selectAuthorization = (state: RootState) => state.authorizationStatus;
const selectUserInfo = (state: RootState) => state.userData;
const selectError = (state: RootState) => state.error;
const selectErrorConnection = (state: RootState) => state.isErrorConnection;

export { selectAuthorization, selectUserInfo, selectError, selectErrorConnection };
