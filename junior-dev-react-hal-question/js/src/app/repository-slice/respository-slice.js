import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import HttpClient from 'http-client';
import _ from 'lodash';
import { findLink } from '@/helpers';
import __reset from '../__reset';
import { addBranchAsync } from '../branch-slice/branch-shared-actions';
import { setSelectedRepository } from './repository-shared-actions';

/**
 * @typedef {import('http-client').RepositoryDoc} RepositoryDoc
 * @typedef {import('http-client').RepositoryListDoc} RepositoryListDoc
 * @typedef {import('../store').RootState} RootState
 * @typedef {import('../fetch-status').FetchStatus} FetchStatus
 * @typedef {import('./repository').Repository} Repository
 * @typedef {import('../fetch-status').FetchStatus} FetchStatus
 *
 * @typedef RepositoryState
 * @property {Record<string, Repository>?} repositories
 * @property {Repository?} selectedRepository
 * @property {FetchStatus} status
 */

/** @type {RepositoryState} */
const initialState = {
  repositories: null,
  selectedRepository: null,
  status: 'idle',
};

export const fetchRepositoriesAsync = createAsyncThunk(
  'repository/fetchList',
  /**
   * @returns {Promise<RepositoryListDoc>}
   */
  () => HttpClient.get('/repositoryList')
);

export const fetchRepositoryAsync = createAsyncThunk(
  'repository/fetch',
  /**
   * @param {Repository} repository
   * @returns {Promise<RepositoryDoc>}
   */
  repository => HttpClient.get(findLink(repository.links, 'self').href)
);

const repositorySlice = createSlice({
  name: 'repository',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(setSelectedRepository, (state, action) => {
        state.selectedRepository = state.repositories[action.payload];
      })
      .addCase(fetchRepositoriesAsync.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchRepositoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.repositories = Object.fromEntries(action.payload.item.map(r => [r.item.id, makeRepoFromDoc(r)]));
      })
      .addCase(fetchRepositoryAsync.fulfilled, (state, action) => {
        state.repositories[action.payload.item.id] = state.selectedRepository = makeRepoFromDoc(action.payload);
      })
      .addCase(addBranchAsync.fulfilled, (state, action) => {
        const branch = _.pick(action.payload.item, 'id', 'name', 'repositoryId');
        state.selectedRepository.branchSummaries[branch.id] = branch;
      })
      .addCase(__reset, state => {
        Object.assign(state, _.cloneDeep(initialState));
        setTimeout(() => {
          /** @type {typeof import('../store').store} */
          const store = require('@/app/store');
          store.dispatch(fetchRepositoriesAsync());
        });
      });
  },
});

/**
 * @param {RepositoryDoc} doc
 * @returns {Repository}
 */
const makeRepoFromDoc = doc => {
  const { item, links } = doc;

  return {
    ...item,
    links,
    readonly: !findLink(links, 'AddBranch'),
  };
};

/**
 * @param {RootState} state
 */
export const selectRepositories = state => state.repository.repositories;
/**
 * @param {RootState} state
 */
export const selectFetchRepositoryStatus = state => state.repository.status;
/**
 * @param {RootState} state
 */
export const selectSelectedRepository = state => state.repository.selectedRepository;

export default repositorySlice.reducer;
