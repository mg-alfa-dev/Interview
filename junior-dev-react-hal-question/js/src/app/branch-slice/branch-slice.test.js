import Branch from './branch';
import reducer, { getBranchKey, setSelectedBranch } from './branch-slice';

jest.useFakeTimers();

/** @type {Branch} */
const fakeBranch = {
  dateCreated: 'date-created',
  details: 'details',
  id: 'id',
  name: 'fake branch',
  repositoryId: 'repoId',
};

const fakeBranchKey = getBranchKey(fakeBranch);

describe('branchSlice', () => {
  afterEach(jest.runAllTimers);

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toMatchInlineSnapshot(`
      Object {
        "branches": Object {},
        "status": Object {
          "fetchBranch": "idle",
        },
      }
    `);
  });

  it('should set the selected branch', () => {
    const defaultValue = reducer(undefined, {});
    expect(reducer({ ...defaultValue, branches: { [fakeBranchKey]: fakeBranch } }, setSelectedBranch(fakeBranch)).selectedBranch).toBe(fakeBranch);
  });

  it.todo('should set status.fetchBranch to loading when the branch details are being fetched');
  it.todo('should set status.fetchBranch to idle after the branch details have been fetched');
});
