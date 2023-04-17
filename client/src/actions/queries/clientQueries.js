import { gql } from "@apollo/client";

const GET_CLIENTS = gql`
	query getClients {
		clients {
			id
			name
			email
			phone
		}
	}
`;

const GET_CLIENTS_X = gql`
	query getClientsx {
		clients {
			id
			name
		}
	}
`;

export { GET_CLIENTS, GET_CLIENTS_X };
