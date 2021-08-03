import {
  ApolloClient,
  NormalizedCacheObject,
  InMemoryCache,
  useQuery,
  HttpLink,
  gql,
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";

class GitgubApolloService {
  client: ApolloClient<NormalizedCacheObject>;
  url: string = "https://api.github.com/graphql";
  token: string = "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";

  constructor() {
    const httpLink = new HttpLink({ uri: this.url });

    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          authorization: this.token ? `Bearer ${this.token}` : "",
        },
      };
    });

    this.client = new ApolloClient({
      cache: new InMemoryCache(),
      link: authLink.concat(httpLink),
    });
  }

  /*async getRepos(input: string) {
    const res = await this.client.query({
      query: gql`
        query {
          search(query: ${input}, type: REPOSITORY, first: 5) {
            nodes {
              name
            }
          }
        }
      `,
    });
  }*/
}

export default GitgubApolloService;
