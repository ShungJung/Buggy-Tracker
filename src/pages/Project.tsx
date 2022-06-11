import { invoke } from '@tauri-apps/api';
import { TIssue, TProject } from '../types';
import { appWindow } from '@tauri-apps/api/window';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Input, List } from '@mantine/core';

const Project = () => {
    const [issues, setIssues] = useState<Map<string, TIssue>>(new Map());
    const [projects, setProjects] = useState<Map<string, TProject>>(new Map());
    const [editIssue, setEditIssue] = useState<TIssue>({} as TIssue);

    const { projectId } = useParams();

    useEffect(() => {
        const getData = async() => {
            setProjects(new Map(Object.entries(await invoke('read_project'))) ?? new Map());
            setIssues(new Map(Object.entries(await invoke('read_issue', { projectId }))) ?? new Map());
        };
        getData();
    }, []);

    async function handleDelete(issueId: string){
        try{
            await invoke('delete_issue', {
                issueId,
                projectId,
            });
            setIssues(new Map(Object.entries(await invoke('read_issue', { projectId }))) ?? new Map());
        }catch(error){
            console.error(error);
        }
    }

    async function handleEditSubmit(e: FormEvent, title: string, description: string, issueId: string){
        e.preventDefault();
        try{
            await invoke('update_issue', {
                title,
                description,
                issueId,
                projectId,
            });
            setIssues(new Map(Object.entries(await invoke('read_issue', { projectId }))) ?? new Map());
        }catch(error){
            console.error(error);
        }
    }

    try{
        const [edit, setEdit] = useState({ issueId: '', isEdit: false });
        appWindow.setTitle(projects.get(projectId!)!.name ?? 'Project');

        const list = [];

        for(let [key, issue] of issues){
            list.push(
                <List.Item key={`${key}`}>
                    <Link to={`/issue/${projectId}/${key}`}>
                        {issue.title}
                    </Link>
                    <Button onClick={() => (
                        handleDelete(key)
                    )}>🗑️</Button>
                    <Button onClick={() => {
                        setEdit({ issueId: key, isEdit: !edit.isEdit });
                    }}>✏️</Button>
                    {
                        edit.isEdit && edit.issueId === key
                            ?
                            <form onSubmit={e => {
                                handleEditSubmit(e, editIssue.title, editIssue.description, key);
                                setEdit({ issueId: '', isEdit: false });
                            }}>
                                <Input
                                    type="text"
                                    placeholder="title"
                                    onChange={(e: ChangeEvent) =>
                                        setEditIssue({
                                            title: (e.target as HTMLInputElement).value,
                                            description: editIssue.description,
                                            priority: editIssue.priority,
                                            deadline: editIssue.deadline,
                                        })}
                                    required
                                />
                                <Input
                                    type="text"
                                    placeholder="description"
                                    onChange={(e: ChangeEvent) =>
                                        setEditIssue({
                                            title: editIssue.title,
                                            description: (e.target as HTMLInputElement).value,
                                            priority: editIssue.priority,
                                            deadline: editIssue.deadline,
                                        })}
                                    required
                                />
                                <Button type="submit" hidden></Button>
                            </form>
                            : null
                    }
                    <h3>{issue.priority}</h3>
                    <h3>{issue.deadline.toDateString()}</h3>
                </List.Item>
            );
        }

        return (
            <div>
                <Input type="text" placeholder="Search..."/>
                <Button
                    component={Link}
                    to={`/createIssue/${projectId}`}
                > Create Issue </Button>

                <fieldset>
                    <legend>
                        {projects.get(projectId!)!.name || 'Issues'}
                    </legend>

                    <List>
                        {list ?? <List.Item key="0">No projects</List.Item>}
                    </List>
                </fieldset>
            </div>
        );
    }catch(error){
        console.error(error);
        return <h1>ERROR</h1>;
    }
};

export default Project;