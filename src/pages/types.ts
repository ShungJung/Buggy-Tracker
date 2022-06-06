export interface TProject{
    name: string;
    issues: Map<string, TIssue>;
}

export interface TIssue{
    title: string;
    description: string;
}