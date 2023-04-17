import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ADD_CLIENT } from "../../actions/mutations/clientMutations";
import { GET_CLIENTS } from "../../actions/queries/clientQueries";
import { useMutation } from "@apollo/client";

const defaultFormData = {
	name: "",
	email: "",
	phone: "",
};

const AddClient = () => {
	const navigate = useNavigate();

	const [formData, setFormData] = useState(defaultFormData);
	const [formErrors, setFormErrors] = useState({});

	const [addClient] = useMutation(ADD_CLIENT, {
		variables: formData,
		refetchQueries: [{ query: GET_CLIENTS }],
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const validateInput = ({ name, email, phone }) => {
		const errors = {};
		if (!name) errors.name = "Please enter name";
		if (!email) errors.email = "Please enter email";
		if (!phone) errors.phone = "Please enter phone number";
		else if (phone.length !== 10) errors.phone = "Please enter valid phone number";

		setFormErrors(errors);
		if (Object.keys(errors).length > 0) return false;
		return true;
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!validateInput(formData)) return;

		addClient();

		setFormData(defaultFormData);

		navigate("/");
	};

	return (
		<div className="mt-10">
			<div className="mb-10">
				<button onClick={() => navigate("../")} className="btn bg-purple-800">
					{"< Back"}
				</button>
			</div>
			<form onSubmit={handleSubmit} autoComplete="off">
				<div className="w-[350px]">
					<div className="form-control my-2 w-[100%]">
						<label className="input-group input-group-horizontal w-full">
							<span className="px-5 py-1">Name</span>
							<input
								type="text"
								name="name"
								onChange={handleInputChange}
								value={formData.name}
								placeholder="Tony Stark"
								className="input input-bordered focus:outline-none w-full"
							/>
						</label>
						<p className={styles.error}>{formErrors.name}</p>
					</div>
					<div className="form-control my-2 w-[100%]">
						<label className="input-group input-group-horizontal">
							<span className="px-5 py-1">Email</span>
							<input
								type="text"
								name="email"
								onChange={handleInputChange}
								value={formData.email}
								placeholder="tony@stark.com"
								className="input input-bordered focus:outline-none w-full"
							/>
						</label>
						<p className={styles.error}>{formErrors.email}</p>
					</div>
					<div className="form-control my-2 w-[100%]">
						<label className="input-group input-group-horizontal">
							<span className="px-5 py-1">Phone</span>
							<input
								type="text"
								name="phone"
								onChange={handleInputChange}
								value={formData.phone}
								placeholder="xxxxx-xxxxx"
								className="input input-bordered focus:outline-none w-full"
							/>
						</label>
						<p className={styles.error}>{formErrors.phone}</p>
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
	error: "text-sm text-red-700 px-1",
};

export default AddClient;
