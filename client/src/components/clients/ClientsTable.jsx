import ClientsRow from "./ClientsRow";

const ClientsTable = ({ clients }) => {
	return (
		<div className="overflow-x-auto w-[70%]">
			<table className="table table-zebra w-full">
				{/* head */}
				<thead>
					<tr>
						<th></th>
						<th>Name</th>
						<th>Email</th>
						<th>Phone</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{clients.map((client, index) => (
						<ClientsRow client={client} key={index} index={index} />
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ClientsTable;
