import { findLink } from '@/helpers';
import { createAsyncThunk } from '@reduxjs/toolkit';
import HttpClient from 'http-client';

const addBranchRelType = 'AddBranch';

export const addBranchAsync = createAsyncThunk('branch/add', ({ repository, name }) => {
  return HttpClient.post<BranchDoc>(findLink(repository.links, addBranchRelType).href.replace('{{name}}', name));
});
