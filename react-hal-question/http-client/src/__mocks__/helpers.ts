export const { getBranchKey } = jest.requireActual('../helpers');

export const sleep = () => Promise.resolve();

let newBranchId = 'foo';
export const __setNewBranchId = (id: string) => (newBranchId = id);

export const makeUniqueBranchId = () => newBranchId;
