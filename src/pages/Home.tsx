import ProjectList from '../components/ProjectsList';
import Sidebar from '../components/Sidebar';

const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <p>This is the home page</p>
            <ProjectList/>
            <Sidebar/>
        </div>
    );
};

export default Home;