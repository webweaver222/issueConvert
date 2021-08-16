interface IssuesData {
  id: string;
  nameWithOwner: string;
  issues: {
    edges: IssuesItem[];
  };
}

interface IssuesItem {
  node: {
    title: string;
    body: string;
    id: string;
    createdAt: string;
  };
  cursor: string;
}

export type { IssuesData, IssuesItem };
