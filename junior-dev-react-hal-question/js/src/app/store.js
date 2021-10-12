import { Action, ThunkAction, configureStore, createReducer } from '@reduxjs/toolkit';
import HttpClient from 'http-client';
import __reset from './__reset';
import branchReducer from './branch-slice/branch-slice';
import repositoryReducer from './repository-slice/respository-slice';

export const store = configureStore({
  devTools: true,
  reducer: {
    repository: repositoryReducer,
    branch: branchReducer,
    __reset: createReducer({}, builder => {
      builder.addCase(__reset, () => {
        HttpClient.__reset();
      });
    }),
  },
});

/**
 * @typedef {typeof store.dispatch} AppDispatch
 * @typedef {ReturnType<typeof store.getState>} RootState
 */

/**
 * @template ReturnType
 * @typedef {ThunkAction<ReturnType, RootState, unknown, Action<string>>} AppThunk<ReturnType>
 */
