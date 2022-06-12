import { TIssue } from '../types';
import { invoke } from '@tauri-apps/api/tauri';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Issue = () => {
    const [issues, setIssues] = useState<Map<string, TIssue>>(new Map());
    const { projectId, issueId } = useParams();

    useEffect(() => {
        const getData = async() => {
            setIssues(new Map(Object.entries(await invoke('read_issue', { projectId }))) ?? new Map());
        };
        getData();
    }, []);

    const issue: TIssue = issues.get(issueId!)! ?? { title: '', description: '' };

    return (
        <div>
            <h1>{issue.title}</h1>
            <p>{issue.description}</p>
            <h3>{issue.priority}</h3>
            <h3>{issue.deadline.toDateString()}</h3>
        </div>
    );
};

export default Issue;