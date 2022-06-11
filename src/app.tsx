import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Project from './pages/Project';
import CreateIssue from './pages/CreateIssue';
import Issue from './pages/Issue';
import Projects from './pages/Projects';
import Home from './pages/Home';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/projects" element={<Projects/>}/>
                <Route path="/createIssue/:projectId" element={<CreateIssue/>}/>
                <Route path="/project/:projectId" element={<Project/>}/>
                <Route path="/issue/:projectId/:issueId" element={<Issue/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;