import HttpClient from './HttpClient';
import stateMachine from './state-machine';

jest.mock('./state-machine');

afterEach(jest.resetAllMocks);

const goodURLs: [keyof typeof HttpClient, string, keyof typeof import('./state-machine').default, string, any[]][] = [
  ['get', 'fetch the repository list', 'getRepositoryList', '/repositoryList', []],
  ['get', 'fetch a repository', 'getRepository', '/repository/abcd', ['abcd']],
  ['get', 'fetch branch details', 'getBranchDetails', '/repository/abcd/fetchBranchDetails?id=1234', ['1234', 'abcd']],
  ['post', 'add a branch', 'createBranch', '/repository/abcd/add-branch/?name=foo', ['abcd', 'foo']],
];

test.each(goodURLs)('calling HttpClient.%s() to %s calls stateMachine.%s', async (clientMethod, _, stateMachineMethod, uri, args) => {
  await HttpClient[clientMethod](uri);
  expect(stateMachine[stateMachineMethod]).toHaveBeenCalledTimes(1);
  expect(stateMachine[stateMachineMethod]).toHaveBeenCalledWith(...args);
});

const badURLs: [keyof typeof HttpClient, string, string][] = [
  ['get', 'with a bad url', '/aslkdjf'],
  ['get', 'to add a branch', '/repository/abcd/add-branch?name=foo'],
  ['get', 'to get a repository without an id', '/repository'],
  ['get', 'to get a branch without an id', '/repository/abcd/fetchBranchDetails'],
  ['post', 'with a bad url', '/aslkdjf'],
  ['post', 'to add a branch without a name', '/repository/abcd/add-branch'],
  ['post', 'to add a branch with an empty name', '/repository/abcd/add-branch?name='],
  ['post', 'to fetch the repository list', '/repositoryList'],
  ['post', 'to fetch a repository', '/repository/abcd'],
  ['post', 'to fetch branch details', '/repository/abcd/fetchBranchDetails?id=1234'],
];

test.each(badURLs)('calling HttpClient.%s() %s throws an error', async (method, _, uri) => {
  await expect(HttpClient[method](uri)).rejects.toMatchSnapshot();
});
