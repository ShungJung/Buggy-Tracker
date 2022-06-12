import { TIssue } from '../types';
import { invoke } from '@tauri-apps/api/tauri';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Issue = () => {
    const [issues, setIssues] = useState<Map<string, TIssue>>(new Map());
    const { projectId, issueId } = useParams();

    useEffect(() => {
        const getData = async() => {
            setIssues(new Map(Object.entries(await invoke('get_issues', { projectId }))) ?? new Map());
        };
        getData();
    }, []);

    const issue: TIssue = issues.get(issueId!)! ?? {} as TIssue;

    return (
        <div>
            <h1>{issue.title}</h1>
            <p>{issue.description}</p>
            <p>{issue.priority}</p>
            <p>{issue.deadline}</p>
        </div>
    );
};

export default Issue;