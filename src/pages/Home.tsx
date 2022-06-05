import { Link } from "react-router-dom";
import ProjectList from "../components/ProjectsList";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <p>This is the home page</p>
      <ProjectList/>
    </div>
  );
}

export default Home;