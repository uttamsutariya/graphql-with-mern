import { gql } from "@apollo/client";

const ADD_PROJECT = gql`
	mutation addProject($name: String!, $description: String!, $clientId: String!, $status: ProjectStatus!) {
		addProject(name: $name, description: $description, clientId: $clientId, status: $status) {
			id
			name
			description
			status
			client {
				id
				name
				email
				phone
			}
		}
	}
`;

const UPDATE_PROJECT = gql`
	mutation updateProject($name: String!, $description: String!, $status: ProjectStatus!) {
		updateProject(name: $name, description: $description, status: $status) {
			id
			name
			description
			status
			client {
				id
				name
				email
				phone
			}
		}
	}
`;

const DELETE_PROJECT = gql`
	mutation deleteProject($id: String!) {
		deleteProject(id: $id) {
			id
		}
	}
`;

export { ADD_PROJECT, DELETE_PROJECT, UPDATE_PROJECT };
