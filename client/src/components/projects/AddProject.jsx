import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ADD_PROJECT } from "../../actions/mutations/projectMutations";
import { GET_CLIENTS_X } from "../../actions/queries/clientQueries";
import { GET_PROJECTS } from "../../actions/queries/projectQueries";
import { useMutation, useQuery } from "@apollo/client";

const defaultFormData = {
	name: "",
	description: "",
	status: "",
	clientId: "",
};

const AddProject = () => {
	const navigate = useNavigate();

	const [formData, setFormData] = useState(defaultFormData);
	const [formErrors, setFormErrors] = useState({});

	const { loading, error, data } = useQuery(GET_CLIENTS_X);

	const [addProject] = useMutation(ADD_PROJECT, {
		variables: formData,
		refetchQueries: [{ query: GET_PROJECTS }],
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const validateInput = ({ name, description, clientId, status }) => {
		const errors = {};
		if (!name) errors.name = "Please enter name";
		if (!description) errors.description = "Please enter project description";
		if (!clientId) errors.client = "Please select client";
		if (!status) errors.status = "Please select status";

		setFormErrors(errors);
		if (Object.keys(errors).length > 0) return false;
		return true;
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		console.log(formData);

		if (!validateInput(formData)) return;

		addProject();

		setFormData(defaultFormData);

		navigate("/");
	};

	if (loading) return <p>Loading ...</p>;
	if (error) return <p>Something went wrong ...</p>;

	return (
		<div className="mt-10">
			<div className="mb-10">
				<button onClick={() => navigate("../")} className="btn bg-purple-800">
					{"< Back"}
				</button>
			</div>
			<form onSubmit={handleSubmit} autoComplete="off">
				<div className="w-[600px]">
					<div className="form-control my-2 w-[100%]">
						<label className="input-group input-group-horizontal w-full">
							<span className="px-5 py-1">Name</span>
							<input
								type="text"
								name="name"
								onChange={handleInputChange}
								value={formData.name}
								placeholder="Open AI"
								className="input input-bordered focus:outline-none w-full"
							/>
						</label>
						<p className={styles.error}>{formErrors.name}</p>
					</div>
					<div className="form-control my-2 w-[100%]">
						<label className="input-group input-group-horizontal">
							<span className="px-5 py-1">Description</span>
							<textarea
								name="description"
								onChange={handleInputChange}
								value={formData.description}
								placeholder="Enter project description"
								className="input input-bordered focus:outline-none w-full py-1"
							/>
						</label>
						<p className={styles.error}>{formErrors.description}</p>
					</div>
					<div className="form-control my-2 w-[100%]">
						<label className="input-group input-group-horizontal">
							<span className="px-5 py-1">Client</span>
							<select
								name="clientId"
								value={formData.clientId}
								onChange={handleInputChange}
								className="input input-bordered focus:outline-none w-full"
							>
								<option value="">Select Client</option>
								{data?.clients.map((client) => (
									<option key={client?.id} value={client?.id}>
										{client?.name}
									</option>
								))}
							</select>
						</label>
						<p className={styles.error}>{formErrors.client}</p>
					</div>
					<div className="form-control my-2 w-[100%]">
						<label className="input-group input-group-horizontal">
							<span className="px-5 py-1">Status</span>
							<select
								name="status"
								value={formData.status}
								onChange={handleInputChange}
								className="input input-bordered focus:outline-none w-full"
							>
								<option value="">Select Status</option>
								<option value="new">Not Started</option>
								<option value="progress">In progress</option>
								<option value="completed">Completed</option>
							</select>
						</label>
						<p className={styles.error}>{formErrors.status}</p>
					</div>

					<div className="form-control my-2 w-[100%]">
						<button className="btn btn-success">Add</button>
					</div>
				</div>
			</form>
		</div>
	);
};

const styles = {
	error: "text-sm text-red-500 px-1",
};

export default AddProject;
