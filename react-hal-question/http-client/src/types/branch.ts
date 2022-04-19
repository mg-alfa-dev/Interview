import type { HALLink } from 'http-client';

export interface BranchSummary {
  id: string;
  repositoryId: string;
  name: string;
}

export interface Branch extends BranchSummary {
  dateCreated: Date;
  details: string;
  links: HALLink[];
}
