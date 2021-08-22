interface IssueComments {
  cursor: string;
  node: {
    id: string;
    body: string;
    createdAt: string;
    author: {
      avatarUrl: string;
      login: string;
    };
  };
}

interface IssueDetailsData {
  node: {
    body: string;
    comments: {
      edges: IssueComments[];
    };
  };
}

export type { IssueDetailsData, IssueComments };
