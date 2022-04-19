/**
 * @typedef {import('../branch-slice/branch').BranchSummary} BranchSummary
 *
 * @typedef Repository
 * @property {Record<string, BranchSummary>} branchSummaries
 * @property {string} id
 * @property {import('http-client').HALLink[]} links
 * @property {string} name
 * @property {boolean} readonly
 */
export {};
