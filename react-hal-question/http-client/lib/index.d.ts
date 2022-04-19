declare module 'http-client' {
  export interface HALDocument<T = any> {
    contentType?: string;
    item: T;
    links: HALLink[];
  }

  export interface HALLink {
    contentType?: string;
    href: string;
    rel: string;
  }

  export type RepositoryListContentType = 'application/vnd.RepositoryList';

  export interface RepositoryListDoc extends HALDocument<RepositoryDoc[]> {
    contentType: RepositoryListContentType;
  }

  export type RepositoryContentType = 'application/vnd.Repository';

  export interface RepositoryDoc extends HALDocument<{
    id: string;
    name: string;
    branchSummaries: Record<string, { id: string; repositoryId: string; name: string }>;
  }> {
    contentType: RepositoryContentType;
  }

  export type BranchContentType = 'application/vnd.Branch';

  export interface BranchDoc extends HALDocument<{
    id: string;
    repositoryId: string;
    name: string;
    dateCreated: string;
    details: string;
  }> {
    contentType: BranchContentType;
  }

  namespace HttpClient {
    /** Mimics an HTTP GET call to the server. */
    function get<T extends HALDocument = HALDocument>(href: string): Promise<T>;
    /** Mimics an HTTP POST call to the server. */
    function post<T extends HALDocument = HALDocument>(href: string, body?: any): Promise<T>;
    /** Resets the server state for debugging purposes. */
    function __reset(): void;
  }

  export default HttpClient;
}
