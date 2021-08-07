import {
  ApolloClient,
  NormalizedCacheObject,
  InMemoryCache,
  HttpLink,
  gql,
  ApolloQueryResult,
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";

class GithubApolloService {
  client: ApolloClient<NormalizedCacheObject>;
  url: string = "https://api.github.com/graphql";
  token: string = "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";

  constructor() {
    const httpLink = new HttpLink({ uri: this.url });

    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          Authorization: this.token ? `bearer ${this.token}` : "",
        },
      };
    });

    this.client = new ApolloClient({
      cache: new InMemoryCache(),
      link: authLink.concat(httpLink),
    });
  }

  getRepos = (input: string) => {
    return this.client.query({
      query: gql`
        query ($input: String!) {
          search(query: $input, type: REPOSITORY, first: 5) {
            nodes {
              ... on Repository {
                id
                name
                nameWithOwner
                owner {
                  login
                }
              }
            }
          }
        }
      `,
      variables: {
        input,
      },
    });
  };
}

export default GithubApolloService;
export type { ApolloQueryResult };
