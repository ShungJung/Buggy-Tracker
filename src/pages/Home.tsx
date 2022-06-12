import ProjectList from '../components/ProjectList';
import MainLayout from '../layouts/MainLayout';

const Home = () => {    
    return (
        <div>
            <MainLayout/>
            <h1>Home</h1>
            <p>This is the home page</p>
            <ProjectList/>
        </div>
    );
};

export default Home;