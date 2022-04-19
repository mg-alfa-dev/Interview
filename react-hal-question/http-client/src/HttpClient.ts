import type { HALDocument } from 'http-client';
import stateMachine from './state-machine';

const HttpClient = {
  async get(href: string): Promise<HALDocument> {
    console.log(`Processing request for ${href}`);

    const result = await (async () => {
      let match: RegExpExecArray | null;
      const qs = new URL(`http://dummy${href}`).searchParams;

      if (href === '/repositoryList') {
        return stateMachine.getRepositoryList();
      } else if ((match = /^\/repository\/([^/]+)\/?$/.exec(href))) {
        return stateMachine.getRepository(match[1]);
      } else if ((match = /^\/repository\/([^/]+)\/fetchBranchDetails\b/.exec(href))) {
        let id: string | null;
        if (!(id = qs.get('id'))) {
          throw new Error('Branch id must be specified.');
        }

        return stateMachine.getBranchDetails(id, match[1]);
      }

      throw new Error(`Resource not found: ${href}`);
    })();

    console.log('Result:');
    console.dir(result);
    return result;
  },

  async post(href: string, body?: any): Promise<HALDocument> {
    console.log(`Processing request for ${href}`);

    const result = await (async () => {
      let match: RegExpExecArray | null;
      const qs = new URL(`http://dummy${href}`).searchParams;

      if ((match = /^\/repository\/([^/]+)\/add-branch\b/.exec(href))) {
        const repoId = match[1];
        let name: string | null;
        if (!(name = qs.get('name'))) {
          throw new Error('Branch name must be specified.');
        }

        return stateMachine.createBranch(repoId, name);
      }

      throw new Error(`Resource not found: ${href}`);
    })();

    console.log('Result:');
    console.dir(result);
    return result;
  },

  __reset() {
    console.debug('Resetting state');
    stateMachine.reset();
  },
};

export default HttpClient;
