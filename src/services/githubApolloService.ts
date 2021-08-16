import {
  ApolloClient,
  NormalizedCacheObject,
  InMemoryCache,
  HttpLink,
  gql,
  ApolloQueryResult,
} from "@apollo/client";

import config from "../../config";

import { setContext } from "@apollo/client/link/context";

class GithubApolloService {
  client: ApolloClient<NormalizedCacheObject>;
  url: string = "https://api.github.com/graphql";
  token: string = config.github_token;

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

  getIssues = (id: string, cursor?: string) => {
    return this.client.query({
      query: gql`
        query ($id: ID!, $cursor: String!) {
          node(id: $id) {
            ... on Repository {
              nameWithOwner
              id
              issues(
                first: ${cursor ? "5" : "10"}
                orderBy: { field: CREATED_AT, direction: DESC }
                after: ${cursor ? "$cursor" : "null"}
              ) {
                edges {
                  node {
                    title
                    id
                    body
                    createdAt
                    comments {
                      totalCount
                    }
                  }
                  cursor
                }
              }
            }
          }
        }
      `,
      variables: {
        id,
        cursor,
      },
    });
  };

  getImmidiate = () => {
    return this.client.query({
      query: gql`
        query {
          node(id: "MDEwOlJlcG9zaXRvcnk2NTc5NDI5Mg==") {
            ... on Repository {
              nameWithOwner
              id
              issues(
                first: 10
                orderBy: { field: CREATED_AT, direction: DESC }
              ) {
                edges {
                  node {
                    title
                    id
                    body
                    createdAt
                    comments {
                      totalCount
                    }
                  }
                  cursor
                }
              }
            }
          }
        }
      `,
    });
  };

  getComments = (repoId: string) => {};

  addComment = (issueId: string) => {};
}

export default GithubApolloService;
export type { ApolloQueryResult };
