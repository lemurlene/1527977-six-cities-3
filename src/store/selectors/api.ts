import type { RootState } from '../type';
import { AuthorizationEnum } from '../../const/type';

const selectAuthorization = (state: RootState):AuthorizationEnum => state.authorizationStatus;
const selectError = (state: RootState): string | null => state.error;

export { selectAuthorization, selectError };
