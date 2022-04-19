import _ from 'lodash';
import defaultState from './default-state';
import stateMachine from './state-machine';

const { __setNewBranchId } = require('./helpers') as typeof import('./__mocks__/helpers');

jest.mock('./helpers');
const [repo1Id, repo2Id] = Object.values(defaultState.repositories).map(r => r.id);
const [branch1id, branch2id] = Object.values(defaultState.branches).map(b => b.id);

beforeEach(() => {
  stateMachine.reset();
});

afterEach(() => {
  __setNewBranchId('foo');
});

test('call reset() resets to default state', () => {
  delete stateMachine.repositories.b5ob3r;
  delete stateMachine.branches.rvpylf;

  stateMachine.reset();

  expect(stateMachine).toMatchObject(defaultState);
});

test('getting the repository list returns the repositories document as expected', async () => {
  expect(await stateMachine.getRepositoryList()).toMatchSnapshot();
});

test('getting a repository returns the repository document as expected', async () => {
  expect(await stateMachine.getRepository(repo1Id)).toMatchSnapshot();
});

test('getting a repository that does not exist throws an error', async () => {
  await expect(stateMachine.getRepository('foo')).rejects.toMatchInlineSnapshot(`[Error: Repository with id 'foo' does not exist.]`);
});

test('getting branch details returns the branch document as expected', async () => {
  expect(await stateMachine.getBranchDetails(branch1id, repo1Id)).toMatchSnapshot();
});

test('getting a branch that does not exist on a given repo throws an error', async () => {
  await expect(stateMachine.getBranchDetails(branch2id, repo2Id)).rejects.toMatchInlineSnapshot(`[Error: Branch with id 'k0dceo' not found in repository with id '5mcf7i'.]`);
});

test('adding a branch acts as expected', async () => {
  expect(await stateMachine.createBranch(repo1Id, 'bar')).toMatchSnapshot({ item: { dateCreated: expect.any(String) } }, 'response data');
  expect(stateMachine.branches[JSON.stringify([repo1Id, 'foo'])]).toMatchSnapshot(
    {
      dateCreated: expect.any(Date),
    },
    'added branch data'
  );
  expect(await stateMachine.getRepository(repo1Id)).toMatchSnapshot('repository response data');
  expect(await stateMachine.getBranchDetails('foo', repo1Id)).toMatchSnapshot(
    {
      item: {
        dateCreated: expect.any(String),
      },
    },
    'branch details response data'
  );
});

test('adding a branch to a readonly repository throws an error', async () => {
  await expect(stateMachine.createBranch(repo2Id, 'bar')).rejects.toMatchInlineSnapshot(
    `[Error: You do not have permissions to create a branch on repository 'Walk unscheduled (read-only)']`
  );
});

test('adding a branch to a non-existent repository throws an error', async () => {
  await expect(stateMachine.createBranch('lol wut?', 'bar')).rejects.toMatchInlineSnapshot(`[Error: Repository with id 'lol wut?' does not exist.]`);
});
