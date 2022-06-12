import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Project from './pages/Project';
import CreateIssue from './pages/CreateIssue';
import Issue from './pages/Issue';
import Projects from './pages/Projects';
import Home from './pages/Home';
import { useEffect } from 'react';
import { appWindow } from '@tauri-apps/api/window';

const App = () => {
    const location = useLocation();

    useEffect(() => {
        appWindow.setTitle(location.pathname);
    }, [location]);

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
