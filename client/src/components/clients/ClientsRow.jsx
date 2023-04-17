import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "../../actions/mutations/clientMutations";
import { GET_CLIENTS } from "../../actions/queries/clientQueries";

const ClientsRow = ({ client, index }) => {
	const [deleteClient] = useMutation(DELETE_CLIENT, {
		variables: { id: client.id },
		refetchQueries: [{ query: GET_CLIENTS }],
		// update(cache, { data: { deleteClient } }) {
		// 	const { clients } = cache.readQuery({ query: GET_CLIENTS });
		// 	cache.writeQuery({
		// 		query: GET_CLIENTS,
		// 		data: { clients: clients.filter((c) => c.id != deleteClient.id) },
		// 	});
		// },
	});

	const handleDelete = () => {
		const confirm = window.confirm("Are you sure want to delete ?");
		if (confirm) deleteClient();
	};

	return (
		<tr className="text-sm">
			<td>{index + 1}</td>
			<td>{client.name}</td>
			<td>{client.email}</td>
			<td>{client.phone}</td>
			<td onClick={handleDelete} className="cursor-pointer text-red-500">
				<FaTrash />
			</td>
		</tr>
	);
};

export default ClientsRow;
