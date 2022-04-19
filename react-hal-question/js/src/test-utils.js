import React from 'react';
import { configureStore, createReducer } from '@reduxjs/toolkit';
import { fireEvent, render as rtlRender } from '@testing-library/react';
import HttpClient from 'http-client';
import _ from 'lodash';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import __reset from './app/__reset';
import branchReducer from './app/branch-slice/branch-slice';
import repositoryReducer from './app/repository-slice/respository-slice';

/**
 * @template T
 * @typedef {import('redux').DeepPartial<T>} DeepPartial<T>
 */

/**
 * @typedef {import('@/app/store').RootState} RootState
 */

/** @type {RootState} */
const defaultState = {
  branch: {
    branches: {},
    status: {
      fetchBranch: 'idle',
    },
  },
  repository: {
    repositories: null,
    selectedRepository: null,
    status: 'idle',
  },
  __reset: {},
};

/**
 * @typedef ExtendedRenderOptions
 * @property {DeepPartial<RootState>} preloadedState
 * @property {typeof import('@/app/store').store} store
 */
/**
 * @template Q
 * @typedef {import('@testing-library/react').RenderOptions<Q> & ExtendedRenderOptions} RenderOptions<Q>
 */

/**
 * @template Q
 * @param {import('react').ReactElement} ui
 * @param {RenderOptions<Q>} param1
 */
function render(
  ui,
  {
    preloadedState,
    store = configureStore({
      reducer: {
        repository: repositoryReducer,
        branch: branchReducer,
        __reset:
          createReducer <
          unknown >
          ({},
          builder => {
            builder.addCase(__reset, () => {
              HttpClient.__reset();
            });
          }),
      },
      preloadedState: _.merge({}, defaultState, preloadedState),
    }),
    ...renderOptions
  } = { preloadedState: defaultState }
) {
  const Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

/** @type {import('@testing-library/react'.fireEvent['change'])} */
export function fireChangeEvent(target, value) {
  if (typeof value !== 'object') {
    value = { value };
  }

  const eventOptions = {
    target: value,
    currentTarget: value,
  };

  act(() => {
    fireEvent.change(target, eventOptions);
  });
}

/** @type {import('@testing-library/react').fireEvent['click']} */
export function fireClickEvent(...[target, options]) {
  act(() => {
    fireEvent.click(target, options);
  });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
