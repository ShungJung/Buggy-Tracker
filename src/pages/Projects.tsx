import { appWindow } from '@tauri-apps/api/window';
import ProjectList from '../components/ProjectList';

const Projects = () => {
    appWindow.setTitle("Projects")

    return (
        <div>
            <ProjectList/>
        </div>
    );
};

export default Projects;