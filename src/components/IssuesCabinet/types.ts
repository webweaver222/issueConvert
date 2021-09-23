interface IssuesData {
  id: string;
  nameWithOwner: string;
  issues: {
    totalCount: number;
    edges: IssuesItem[];
  };
}

interface IssuesItem {
  node: {
    title: string;
    body: string;
    id: string;
    createdAt: string;
    comments: {
      totalCount: number;
    };
    author: {
      login: string;
      avatarUrl: string;
    };
    state: string;
  };
  cursor: string;
}

export type { IssuesData, IssuesItem };
