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
        query getIssues($id: ID!, $cursor: String, $qnty: Int!) {
          node(id: $id) {
            ... on Repository {
              nameWithOwner
              id
              issues(
                states: OPEN
                first: $qnty
                orderBy: { field: CREATED_AT, direction: DESC }
                after: $cursor
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
        qnty: cursor ? 5 : 10,
      },
    });
  };

  /**  
  } */

  getComments = (issueId: string, cursor?: string) => {
    return this.client.query({
      query: gql`
        query getComments($id: ID!, $cursor: String, $qnty: Int!) {
          node(id: $id) {
            ... on Issue {
              body
              title
              comments(
                first: $qnty
                after: $cursor
                orderBy: { field: UPDATED_AT, direction: DESC }
              ) {
                edges {
                  cursor
                  node {
                    body
                    author {
                      avatarUrl(size: 30)
                      login
                    }
                    createdAt
                    id
                  }
                }
              }
            }
          }
        }
      `,
      variables: {
        id: issueId,
        cursor,
        qnty: cursor ? 2 : 5,
      },
    });
  };

  addComment = (issueId: string) => {};
}

export default GithubApolloService;
export type { ApolloQueryResult };
