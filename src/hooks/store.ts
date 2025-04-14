import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/type';

// import { useMemo } from 'react';
// import type { store } from '../store';


const useAppDispatch = useDispatch<AppDispatch>;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// const useAppStore: () => typeof store = useStore;

// const useActionCreators = <Actions extends ActionCreatorsMapObject>(actions: Actions) => {
//   const dispatch = useAppDispatch();
//   return useMemo(() => bindActionCreators(actions, dispatch), [actions, dispatch]);
// };

// export { useAppDispatch, useAppSelector, useAppStore, useActionCreators };

export { useAppDispatch, useAppSelector };
