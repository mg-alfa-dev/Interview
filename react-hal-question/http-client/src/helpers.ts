import type { BranchSummary } from './types';

export const getBranchKey = (branch: Pick<BranchSummary, 'id' | 'repositoryId'>) => JSON.stringify([branch.repositoryId, branch.id]);
export const sleep = (ms?: number) => new Promise(res => setTimeout(res, ms));
export const makeUniqueBranchId = () => {
  return Math.random().toString(36).slice(2, 8);
};
