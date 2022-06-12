import { invoke } from '@tauri-apps/api/tauri';
import { TProject } from '../types';
import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from 'react';
import { Box, Button, Input, List } from '@mantine/core';
import { Link } from 'react-router-dom';

const ProjectList = () => {
    const [projects, setProjects] = useState<Map<string, TProject>>(new Map());
    const [name, setName] = useState('');
    const [editName, setEditName] = useState('');

    useEffect(() => {
        const getData = async() => {
            setProjects(new Map(Object.entries(await invoke('get_projects'))) ?? new Map());
        };
        getData();
    }, []);

    async function handleProjectSubmit(e: FormEvent){
        e.preventDefault();
        try{
            await invoke('create_project', { name });
            setProjects(new Map(Object.entries(await invoke('get_projects'))) ?? new Map());
        }catch(error){
            console.error(error);
        }
    }

    async function handleDelete(e: MouseEvent<HTMLButtonElement>, projectId: string){
        try{
            await invoke('delete_project', {
                projectId,
            });
            setProjects(new Map(Object.entries(await invoke('get_projects'))) ?? new Map());
        }catch(error){
            console.error(error);
        }
    }

    async function handleEditSubmit(e: FormEvent, name: string, projectId: string){
        e.preventDefault();
        try{
            await invoke('update_project', {
                name,
                projectId,
            });
            setProjects(new Map(Object.entries(await invoke('get_projects'))) ?? new Map());
        }catch(error){
            console.error(error);
        }
    }

    const [edit, setEdit] = useState({ projectId: '', isEdit: false });
    const list = [];

    let index = 0;

    for(const [key, value] of projects){
        list.push(
            <List.Item key={index}>
                <Link to={`/project/${key}`}>
                    {value.name}
                </Link>
                <Button
                    onClick={(e: MouseEvent<HTMLButtonElement>) => (
                        handleDelete(e, key
                        ))}>🗑️</Button>
                <Button onClick={() => {
                    setEdit({ projectId: key, isEdit: !edit.isEdit });
                }}>✏️</Button>
                {
                    edit.isEdit && edit.projectId === key
                        ?
                            <form onSubmit={e => {
                                handleEditSubmit(e, editName, key);
                                setEdit({ projectId: key, isEdit: false });
                            }}>
                                <Input type="text" placeholder="title" onChange={(e: ChangeEvent) => setEditName((e.target as HTMLInputElement).value)}/>
                                <Button type="submit" hidden></Button>
                            </form>
                        : null
                }
            </List.Item>
        );
        index++
    }

    return (
        <div>
            <Box>
                <form onSubmit={handleProjectSubmit}>
                    <Input
                        type="text"
                        onChange={(e: FormEvent) => {
                            setName((e.target as HTMLInputElement).value);
                        }}
                        required
                    />
                    <Button type="submit">Create</Button>
                </form>
            </Box>
            <List>
                {list ?? <List.Item key="0">No projects</List.Item>}
            </List>
        </div>
    );
};

export default ProjectList;