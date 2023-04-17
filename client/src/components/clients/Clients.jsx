import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import ClientsTable from "./ClientsTable";

import { GET_CLIENTS } from "../../actions/queries/clientQueries";

const Clients = () => {
	const navigate = useNavigate();

	const { loading, error, data } = useQuery(GET_CLIENTS);

	if (loading) return <p>Loading ...</p>;
	if (error) return <p>Something went wrong</p>;

	return (
		<div className="my-10">
			<div className="mb-10">
				<button onClick={() => navigate("/client/add")} className="btn bg-purple-800">
					Add new client
				</button>
			</div>

			{!loading && !error && <ClientsTable clients={data.clients} />}
		</div>
	);
};

export default Clients;
