import { getBranchKey } from './helpers';
import type { StateMachine } from './state-machine';
import type { Branch } from './types';

export const branches: Branch[] = [
  {
    id: 'b5ob3r',
    name: 'Branch 1',
    repositoryId: 'e2mh4q',
    links: [{ rel: 'fetchDetails-b5ob3r', href: '/e2mh4q/fetchBranchDetails?id=b5ob3r' }],
    dateCreated: new Date(1633120966761),
    details: 'I am Branch 1.  Enjoy.',
  },
  {
    id: 'k0dceo',
    name: 'Branch 2',
    repositoryId: 'e2mh4q',
    links: [{ rel: 'fetchDetails-k0dceo', href: '/e2mh4q/fetchBranchDetails?id=k0dceo' }],
    dateCreated: new Date(1633034849927),
    details: 'I am Branch 2.  Not as enjoyable as Branch 1.  I am sorry.',
  },
  {
    id: 'b5ob3r',
    name: 'Branch 3',
    repositoryId: '5mcf7i',
    links: [{ rel: 'fetchDetails-b5ob3r', href: '/5mcf7i/fetchBranchDetails?id=b5ob3r' }],
    dateCreated: new Date(1633120966761),
    details: 'I could Branch 3.  But am I?',
  },
  {
    id: 'rvpylf',
    name: 'Branch 4',
    repositoryId: '5mcf7i',
    links: [{ rel: 'fetchDetails-rvpylf', href: '/5mcf7i/fetchBranchDetails?id=rvpylf' }],
    dateCreated: new Date(1633034849927),
    details: "I only wish I was Branch 3.  I'm such an imposter. 😭\n\nAnd I have multiple lines! 😧",
  },
];

const defaultState: Readonly<Omit<StateMachine, MethodNames<StateMachine>>> = {
  repositories: Object.fromEntries(
    [
      {
        id: 'e2mh4q',
        name: 'Run schedule',
        readonly: false,
      },
      {
        id: '5mcf7i',
        name: 'Walk unscheduled (read-only)',
        readonly: true,
      },
    ].map(r => [r.id, r])
  ),
  branches: Object.fromEntries(branches.map(b => [getBranchKey(b), b])),
};

export default defaultState;
