import { useNavigate } from "react-router-dom";

const ProjectCard = ({ project }) => {
	const navigate = useNavigate();

	const { id, name, status, description } = project;

	return (
		<>
			<div className="card bg-blue-300 shadow-md hover:shadow-lg text-primary-content">
				<div className="card-body">
					<h2 className="card-title text-black">{name}</h2>
					<p className="text-sm text-gray-800">{description}</p>
					<div className="flex justify-between items-end">
						<div>
							<p className="text-sm">
								<span className="font-semibold text-black">Status : </span>
								<span className="text-gray-800 underline">{status}</span>
							</p>
						</div>
						<div className="card-actions">
							<button
								onClick={() => navigate(`project/${id}`)}
								className="px-3 py-1 bg-purple-800 text-sm rounded-md"
							>
								View
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ProjectCard;
