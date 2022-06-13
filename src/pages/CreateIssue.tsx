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
                priority,
                deadline: deadline?.toDateString(),
                projectId
            });
            navigate(`/project/${projectId}`, { replace: true });
        }catch(error){
            console.error(error);
        }
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