import { useQuery, useMutation } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";

import { GET_PROJECT, GET_PROJECTS } from "../../actions/queries/projectQueries";
import { DELETE_PROJECT } from "../../actions/mutations/projectMutations";
import ClientInfo from "../clients/ClientInfo";

const ProjectDetails = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const { loading, error, data } = useQuery(GET_PROJECT, {
		variables: { id },
	});

	const [deleteProject] = useMutation(DELETE_PROJECT, {
		variables: { id },
		refetchQueries: [{ query: GET_PROJECTS }],
	});

	const handleDelete = () => {
		const confirm = window.confirm("Are you sure want to delete this project ?");
		if (confirm) {
			deleteProject();
			navigate(-1);
		}
	};

	if (loading) return <p>Loading ...</p>;
	if (error) return <p>Something went wrong</p>;

	const { client, description, name, status } = data?.project;

	return (
		<div className="mt-10">
			<div className="mb-10">
				<button onClick={() => navigate(-1)} className="btn bg-purple-800">
					{"< Back"}
				</button>
				<div className="rounded-md shadow-lg my-10 p-10 flex flex-col gap-5">
					<h1 className="font-semibold text-2xl">
						{name}{" "}
						<span
							className={`text-xs mx-5 rounded-lg px-2 py-0.5 text-black 
						${status == "Completed" ? styles.greenBadge : status == "Not started" ? styles.orangeBadge : styles.blueBadge}`}
						>
							{status}
						</span>{" "}
					</h1>
					<p className="text-sm">{description}</p>
					<p className="font-semibold text-xl mt-3">Client Info : </p>
					<ClientInfo client={client} />
					<div>
						<button onClick={handleDelete} className="btn border-none bg-red-500 text-white me-3">
							Delete project
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

let styles = {
	orangeBadge: "bg-orange-400",
	greenBadge: "bg-green-400",
	blueBadge: "bg-blue-400",
};

export default ProjectDetails;
