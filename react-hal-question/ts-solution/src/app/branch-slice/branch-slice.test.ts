import { AnyAction } from 'redux';
import Branch from './branch';
import { addBranchAsync } from './branch-shared-actions';
import reducer, {
  closeDialog,
  fetchBranchDetailsAsync,
  openDialog,
  selectAddBranchStatus,
  selectFetchBranchStatus,
  selectIsDialogOpen,
  selectLoadingBranch,
  selectSelectedBranch,
  setSelectedBranch,
} from './branch-slice';

jest.useFakeTimers();

const fakeBranch: Branch = {
  dateCreated: 'date-created',
  details: 'details',
  id: 'id',
  name: 'fake branch',
  repositoryId: 'repoId',
};

const fakeBranchKey = JSON.stringify([fakeBranch.repositoryId, fakeBranch.id]);

describe('branchSlice', () => {
  afterEach(jest.runAllTimers);

  it('should return the initial state', () => {
    expect(reducer(undefined, {} as AnyAction)).toMatchInlineSnapshot(`
      Object {
        "branches": Object {},
        "dialogOpen": false,
        "status": Object {
          "addBranch": "idle",
          "fetchBranch": "idle",
        },
      }
    `);
  });

  it('should set the selected branch', () => {
    const defaultValue = reducer(undefined, {} as AnyAction);
    expect(reducer({ ...defaultValue, branches: { [fakeBranchKey]: fakeBranch } }, setSelectedBranch(fakeBranch)).selectedBranch).toBe(fakeBranch);
  });

  it.todo('should set status.fetchBranch to loading when the branch details are being fetched');
  it.todo('should set status.fetchBranch to idle after the branch details have been fetched');
});
