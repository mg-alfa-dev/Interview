import { CaseReducer, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import HttpClient, { BranchDoc, HALDocument } from 'http-client';
import _ from 'lodash';

import { findLink } from '@/helpers';

import FetchStatus from '../FetchStatus';
import __reset from '../__reset';
import Repository from '../repository-slice/repository';
import { setSelectedRepository } from '../repository-slice/repository-shared-actions';
import type { RootState } from '../store';
import Branch, { BranchSummary } from './branch';
import { addBranchAsync } from './branch-shared-actions';

const fetchBranchDetailsRelType = (branchId: string) => `FetchDetails-${branchId}`;

interface BranchState {
  branches: Record<string, Branch>;
  dialogOpen: boolean;
  loadingBranch?: BranchSummary;
  selectedBranch?: Branch;
  status: {
    fetchBranch: FetchStatus;
    addBranch: FetchStatus;
  };
}

const initialState: BranchState = {
  branches: {},
  dialogOpen: false,
  status: {
    addBranch: 'idle',
    fetchBranch: 'idle',
  },
};

export const fetchBranchDetailsAsync = createAsyncThunk('branch/fetch', ({ repository, branch }: { repository: Repository; branch: BranchSummary }) => {
  return HttpClient.get<BranchDoc>(findLink(repository.links, fetchBranchDetailsRelType(branch.id))!.href);
});

const getBranchKey = (branch: Pick<BranchSummary, 'id' | 'repositoryId'>) => JSON.stringify([branch.repositoryId, branch.id]);

const branchSlice = createSlice({
  name: 'branch',
  initialState,
  reducers: {
    setSelectedBranch(state, action: PayloadAction<BranchSummary>) {
      state.selectedBranch = state.branches[getBranchKey(action.payload)];
    },
    openDialog(state) {
      state.dialogOpen = true;
    },
    closeDialog(state) {
      state.dialogOpen = false;
    },
  },
  extraReducers(builder) {
    const addBranchToStore: CaseReducer<
      BranchState,
      PayloadAction<
        HALDocument<{
          id: string;
          repositoryId: string;
          name: string;
          dateCreated: string;
          details: string;
        }>
      >
    > = (state, action) => {
      const branch = action.payload.item;
      const key = getBranchKey(branch);

      state.selectedBranch = state.branches[key] = branch;
      state.loadingBranch = undefined;
    };

    builder
      .addCase(setSelectedRepository, state => {
        delete state.selectedBranch;
        delete state.loadingBranch;
      })
      .addCase(fetchBranchDetailsAsync.pending, (state, action) => {
        state.status.fetchBranch = 'loading';
        state.loadingBranch = action.meta.arg.branch;
      })
      .addCase(fetchBranchDetailsAsync.fulfilled, (state, action) => {
        state.status.fetchBranch = 'idle';
        addBranchToStore(state, action);
      })
      .addCase(addBranchAsync.pending, state => {
        state.status.addBranch = 'loading';
      })
      .addCase(addBranchAsync.fulfilled, (state, action) => {
        state.status.addBranch = 'idle';
        state.dialogOpen = false;
        state.branches[getBranchKey(action.payload.item)] = state.selectedBranch = action.payload.item;
      })
      .addCase(__reset, state => {
        Object.assign(state, _.cloneDeep(initialState));
      });
  },
});

export const { setSelectedBranch, openDialog, closeDialog } = branchSlice.actions;

export const selectAddBranchStatus = (state: RootState) => state.branch.status.addBranch;
export const selectFetchBranchStatus = (state: RootState) => state.branch.status.fetchBranch;
export const selectLoadingBranch = (state: RootState) => state.branch.loadingBranch;
export const selectIsDialogOpen = (state: RootState) => state.branch.dialogOpen;
export const selectSelectedBranch = (state: RootState) => state.branch.selectedBranch;

export default branchSlice.reducer;
