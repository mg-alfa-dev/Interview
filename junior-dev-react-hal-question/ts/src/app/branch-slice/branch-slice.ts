import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import HttpClient, { BranchDoc } from 'http-client';
import _ from 'lodash';
import { findLink } from '@/helpers';
import __reset from '../__reset';
import Repository from '../repository-slice/repository';
import { setSelectedRepository } from '../repository-slice/repository-shared-actions';
import type { FetchStatus, RootState } from '../store';
import Branch, { BranchSummary } from './branch';

const fetchBranchDetailsRelType = (branchId: string) => `FetchDetails-${branchId}`;

interface BranchState {
  branches: Record<string, Branch>;
  loadingBranch?: BranchSummary;
  selectedBranch?: Branch;
  status: {
    fetchBranch: FetchStatus;
  };
}

const initialState: BranchState = {
  branches: {},
  status: {
    fetchBranch: 'idle',
  },
};

export const fetchBranchDetailsAsync = createAsyncThunk('branch/fetch', ({ repository, branch }: { repository: Repository; branch: BranchSummary }) => {
  return HttpClient.get<BranchDoc>(findLink(repository.links, fetchBranchDetailsRelType(branch.id))!.href);
});

// TODO: return a unique key when branch IDs could be duplicated in separate repositories
export const getBranchKey = (branch: Pick<BranchSummary, 'id' | 'repositoryId'>) => branch.id;

const branchSlice = createSlice({
  name: 'branch',
  initialState,
  reducers: {
    setSelectedBranch(state, action: PayloadAction<BranchSummary>) {
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

export const selectFetchBranchStatus = (state: RootState) => state.branch.status.fetchBranch;
export const selectLoadingBranch = (state: RootState) => state.branch.loadingBranch;
export const selectSelectedBranch = (state: RootState) => state.branch.selectedBranch;

export default branchSlice.reducer;
