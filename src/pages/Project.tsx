import { Button, TextInput, SegmentedControl } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { invoke } from '@tauri-apps/api/tauri';
import { FormEvent, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const CreateIssue = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('None');
    const [deadline, setDeadline] = useState<Date | null>();
    const navigate = useNavigate();
    const { projectId } = useParams();

    async function handleSubmit(e: FormEvent){
        e.preventDefault();
        try{
            await invoke('create_issue', {
                title,
                description,
                projectId
    useEffect(() => {
        const getData = async() => {
            setProjects(new Map(Object.entries(await invoke('get_projects'))) ?? new Map());
            setIssues(new Map(Object.entries(await invoke('get_issues', { projectId }))) ?? new Map());
        };
        getData();
    }, []);

    async function handleDelete(issueId: string){
        try{
            await invoke('delete_issue', {
                issueId,
                projectId,
            });
            setIssues(new Map(Object.entries(await invoke('get_issues', { projectId }))) ?? new Map());
        }catch(error){
            console.error(error);
        }
    }

    async function handleEditSubmit(e: FormEvent, issue: TIssue,issueId: string){
        e.preventDefault();
        try{
            await invoke('update_issue', {
                ...issue,
                issueId,
                projectId,
            });
            navigate(`/project/${projectId}`, { replace: true });
        }catch(error){
            console.error(error);
        }
    }

    const [edit, setEdit] = useState({ issueId: '', isEdit: false });

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
                                handleEditSubmit(
                                    e,
                                    editIssue,
                                    key
                                );
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
                <p>{issue.priority}</p>
                <p>{issue.deadline}</p>
            </List.Item>
        );
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <TextInput
                label="Title:"
                onChange={e => {
                    setTitle(e.target.value);
                }}
            />
            <TextInput
                label="Description:"
                onChange={e => {
                    setDescription(e.target.value);
                }}
            />
            <SegmentedControl
                size='lg'
                data={[
                    { value: 'None', label: 'None' },
                    { value: 'Low', label: 'Low' },
                    { value: 'Medium', label: 'Medium' },
                    { value: 'High', label: 'High' },
                ]}
                onChange={setPriority} 
            />
            <DatePicker
                label="Deadline:"
                placeholder='Deadline'
                onChange={setDeadline}
            />
            <Button type="submit">Create</Button>
        </form>
    );
};

export default CreateIssue;