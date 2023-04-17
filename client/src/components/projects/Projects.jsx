import { GET_PROJECTS } from "../../actions/queries/projectQueries";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import ProjectCard from "./ProjectCard";

const Projects = () => {
	const navigate = useNavigate();

	const { loading, error, data } = useQuery(GET_PROJECTS);

	if (loading) return <p>Loading ...</p>;
	if (error) return <p>Something went wrong</p>;

	return (
		<div className="mt-10">
			<div className="mb-10">
				<button onClick={() => navigate("/project/add")} className="btn bg-purple-800">
					Add new project
				</button>
			</div>
			<div className="grid grid-cols-3 gap-2 w-[100%]">
				{data?.projects?.map((project, index) => (
					<ProjectCard project={project} key={index} />
				))}
			</div>
		</div>
	);
};

export default Projects;
