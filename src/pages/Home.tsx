import { appWindow } from '@tauri-apps/api/window';
import ProjectList from '../components/ProjectList';

const Home = () => {
    appWindow.setTitle("Home");
    
    return (
        <div>
            <h1>Home</h1>
            <p>This is the home page</p>
            <ProjectList/>
        </div>
    );
};

export default Home;