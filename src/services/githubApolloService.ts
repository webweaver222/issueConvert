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
  oauth: boolean = false;

  constructor(oauth_token?: string) {
    if (oauth_token) {
      this.token = oauth_token;
      this.oauth = true;
    } else {
      this.token = config.github_token;
      this.oauth = false;
    }

    const httpLink = new HttpLink({ uri: this.url });

    const authLink = setContext((_, { headers }) => {
      return {
        headers: {
          ...headers,
          Authorization: this.token
            ? `bearer ${oauth_token ? oauth_token : this.token}`
            : "",
        },
      };
    });

    this.client = new ApolloClient({
      cache: new InMemoryCache(),
      link: authLink.concat(httpLink),
    });
  }

  getUser = () => {
    return this.client.query({
      query: gql`
        query testQuery {
          viewer {
            login
          }
        }
      `,
    });
  };

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
  //  states: OPEN
  getIssues = (id: string, cursor?: string) => {
    return this.client.query({
      query: gql`
        query getIssues($id: ID!, $cursor: String, $qnty: Int!) {
          node(id: $id) {
            ... on Repository {
              nameWithOwner
              id
              issues(
                first: $qnty
                orderBy: { field: CREATED_AT, direction: DESC }
                after: $cursor
              ) {
                totalCount
                edges {
                  node {
                    title
                    id
                    body
                    createdAt
                    comments {
                      totalCount
                    }
                    author {
                      login
                      avatarUrl(size: 30)
                    }
                    state
                    closed
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

  getComments = (issueId: string, cursor?: string) => {
    return this.client.query({
      query: gql`
        query getComments($id: ID!, $cursor: String, $qnty: Int!) {
          node(id: $id) {
            ... on Issue {
              id
              body
              title
              comments(
                first: $qnty
                after: $cursor
                orderBy: { field: UPDATED_AT, direction: DESC }
              ) {
                totalCount
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
        qnty: cursor ? 5 : 5,
      },
    });
  };

  addComment = (issueId: string, input: string) => {
    return this.client.mutate({
      mutation: gql`
        mutation addComment($issueId: ID!, $input: String) {
          __typename
          addComment(input: { subjectId: $issueId, body: $input }) {
            commentEdge {
              node {
                author {
                  login
                  avatarUrl
                }
                body
                id
                createdAt
              }
              cursor
            }
          }
        }
      `,
      variables: {
        issueId,
        input,
      },
    });
  };
}

export default GithubApolloService;
export type { ApolloQueryResult };
