import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import HttpClient from 'http-client';
import _ from 'lodash';
import { findLink } from '@/helpers';
import __reset from '../__reset';
import Repository from '../repository-slice/repository';
import { setSelectedRepository } from '../repository-slice/repository-shared-actions';

const fetchBranchDetailsRelType = branchId => `FetchDetails-${branchId}`;

/**
 * @typedef {import('../store').RootState} RootState
 * @typedef {import('./branch').Branch} Branch
 * @typedef {import('./branch').BranchSummary} BranchSummary
 * @typedef {import('../fetch-status').FetchStatus} FetchStatus
 * @typedef {import('../repository-slice/repository').Repository} Repository
 *
 * @typedef BranchState
 * @property {Record<string, Branch>} branches
 * @property {BranchSummary?} loadingBranch
 * @property {Branch?} selectedBranch
 * @property {{ fetchBranch: FetchStatus }} status
 */

/** @type {BranchState} */
const initialState = {
  branches: {},
  status: {
    fetchBranch: 'idle',
  },
};

export const fetchBranchDetailsAsync = createAsyncThunk('branch/fetch', (/** @type {{ repository: Repository, branch: BranchSummary }} */ { repository, branch }) => {
  return HttpClient.get(findLink(repository.links, fetchBranchDetailsRelType(branch.id)).href);
});

/**
 * @param {Branch} branch
 *
 * @todo return a unique key when branch IDs could be duplicated in separate repositories
 */
export const getBranchKey = branch => branch.id;

const branchSlice = createSlice({
  name: 'branch',
  initialState,
  reducers: {
    setSelectedBranch(state, /** @type {PayloadAction<BranchSummary>} */ action) {
      state.selectedBranch = state.branches[getBranchKey(action.payload)];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(setSelectedRepository, state => {
        delete state.selectedBranch;
        delete state.loadingBranch;
      })
      .addCase(fetchBranchDetailsAsync.pending, (state, action) => {
        // todo
      })
      .addCase(fetchBranchDetailsAsync.fulfilled, (state, action) => {
        // todo
      })
      .addCase(__reset, state => {
        Object.assign(state, _.cloneDeep(initialState));
      });
  },
});

export const { setSelectedBranch } = branchSlice.actions;

export const selectFetchBranchStatus = (/** @type {RootState} */ state) => state.branch.status.fetchBranch;
export const selectLoadingBranch = (/** @type {RootState} */ state) => state.branch.loadingBranch;
export const selectSelectedBranch = (/** @type {RootState} */ state) => state.branch.selectedBranch;

export default branchSlice.reducer;
