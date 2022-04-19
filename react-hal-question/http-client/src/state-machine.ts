import type { BranchDoc, HALLink, RepositoryDoc, RepositoryListDoc } from 'http-client';
import _ from 'lodash';
import defaultState from './default-state';
import { getBranchKey, makeUniqueBranchId, sleep } from './helpers';
import type { Branch, BranchSummary, Repository } from './types';

export class StateMachine {
  repositories!: Record<string, Repository>;
  branches!: Record<string, Branch>;

  constructor() {
    Object.assign(this, _.cloneDeep(defaultState));
    this.makeRepositoryDoc = this.makeRepositoryDoc.bind(this);
  }

  reset() {
    Object.assign(this, _.cloneDeep(defaultState));
  }

  async getRepositoryList(): Promise<RepositoryListDoc> {
    await sleep(Math.random() * 1000);

    return {
      contentType: 'application/vnd.RepositoryList',
      item: Object.values(this.repositories).map(this.makeRepositoryDoc),
      links: [{ rel: 'self', href: '/repositoryList' }],
    };
  }

  async getRepository(id: string): Promise<RepositoryDoc> {
    await sleep(Math.random() * 500);

    const repo = this.repositories[id];
    if (!repo) {
      throw new Error(`Repository with id '${id}' does not exist.`);
    }

    return this.makeRepositoryDoc(repo);
  }

  async getBranchDetails(id: string, repositoryId: string): Promise<BranchDoc> {
    await sleep(Math.random() * 1500 + 1000);
    const dbBranch = this.branches[getBranchKey({ id, repositoryId })];

    if (!dbBranch) {
      throw new Error(`Branch with id '${id}' not found in repository with id '${repositoryId}'.`);
    }

    return {
      contentType: 'application/vnd.Branch',
      item: { ...dbBranch, dateCreated: dbBranch.dateCreated.toUTCString() },
      links: [makeBranchDetailsLink(dbBranch)],
    };
  }

  async createBranch(repositoryId: string, name: string): Promise<BranchDoc> {
    const repo = this.repositories[repositoryId];
    if (!repo) {
      throw new Error(`Repository with id '${repositoryId}' does not exist.`);
    } else if (repo.readonly) {
      throw new Error(`You do not have permissions to create a branch on repository '${repo.name}'`);
    }

    await sleep(Math.random() * 2000 + 3000);

    const id = makeUniqueBranchId();

    const branch: Branch = {
      id,
      dateCreated: new Date(),
      name,
      repositoryId,
      links: [],
      details: 'Lorem ipsum and all that nonsense',
    };

    branch.links.push(makeBranchDetailsLink(branch));

    this.branches[getBranchKey(branch)] = branch;

    return {
      contentType: 'application/vnd.Branch',
      item: {
        ...branch,
        dateCreated: branch.dateCreated.toUTCString(),
      },
      links: [makeBranchDetailsLink(branch)],
    };
  }

  private makeRepositoryDoc(r: Repository): RepositoryDoc {
    const branchSummaries = _(this.branches)
      .values()
      .filter(b => b.repositoryId === r.id)
      .map(b => [b.id, _.pick(b, 'id', 'repositoryId', 'name')])
      .fromPairs()
      .value();

    return {
      contentType: 'application/vnd.Repository',
      item: {
        branchSummaries,
        id: r.id,
        name: r.name,
      },
      links: [
        { rel: 'self', href: `/repository/${r.id}` },
        ...(r.readonly ? [] : [{ href: `/repository/${r.id}/add-branch?name={{name}}`, rel: 'AddBranch' }]),
        ...Object.values(branchSummaries).map(b => makeBranchDetailsLink(b, `FetchDetails-${b.id}`)),
      ],
    };
  }
}

const stateMachine = new StateMachine();
export default stateMachine;

const makeBranchDetailsLink = (branch: BranchSummary, rel = 'self'): HALLink => {
  return { rel, contentType: 'application/vnd.Branch', href: `/repository/${branch.repositoryId}/fetchBranchDetails?id=${branch.id}` };
};
