const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLSchema,
	GraphQLList,
	GraphQLNonNull,
	GraphQLEnumType,
} = require("graphql");

// db models
const ClientModel = require("../models/client.model");
const ProjectModel = require("../models/project.model");

// client type
const ClientType = new GraphQLObjectType({
	name: "Client",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		email: { type: GraphQLString },
		phone: { type: GraphQLString },
	}),
});

// project type
const ProjectType = new GraphQLObjectType({
	name: "Project",
	fields: () => ({
		id: { type: GraphQLID },
		clientId: { type: GraphQLString },
		name: { type: GraphQLString },
		description: { type: GraphQLString },
		status: { type: GraphQLString },
		client: {
			type: ClientType,
			// resolve: async (parent, args) => clients.find((c) => c.id == parent.clientId),
			resolve: async (parent, args) => await ClientModel.findById(parent.clientId),
		},
	}),
});

// root query
const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: () => ({
		// client is query to fetch client by id, accepts id as args, need to pass resolver that returns response
		client: {
			type: ClientType,
			args: { id: { type: GraphQLID } },
			resolve: async (parent, args) => await ClientModel.findById(args.id),
		},
		// get all clients
		clients: {
			type: new GraphQLList(ClientType),
			resolve: async (parent, args) => await ClientModel.find(),
		},
		// get project by id
		project: {
			type: ProjectType,
			args: { id: { type: GraphQLID } },
			resolve: async (parent, args) => await ProjectModel.findById(args.id),
		},
		// get all clients
		projects: {
			type: new GraphQLList(ProjectType),
			resolve: async (parent, args) => await ProjectModel.find(),
		},
	}),
});

// mutations
const mutation = new GraphQLObjectType({
	name: "Mutation",
	fields: () => ({
		// add new client
		addClient: {
			type: ClientType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				email: { type: new GraphQLNonNull(GraphQLString) },
				phone: { type: new GraphQLNonNull(GraphQLString) },
			},
			resolve: async (parent, args) => {
				const { name, email, phone } = args;
				const client = new ClientModel({
					name,
					email,
					phone,
				});

				return await client.save();
			},
		},
		// delete client
		deleteClient: {
			type: ClientType,
			args: { id: { type: new GraphQLNonNull(GraphQLString) } },
			resolve: async (parent, args) => await ClientModel.findByIdAndRemove(args.id),
		},
		// add new project
		addProject: {
			type: ProjectType,
			args: {
				name: { type: new GraphQLNonNull(GraphQLString) },
				description: { type: new GraphQLNonNull(GraphQLString) },
				status: {
					type: new GraphQLEnumType({
						name: "ProjectStatus",
						values: {
							new: { value: "Not started" },
							progress: { value: "In progress" },
							completed: { value: "Completed" },
						},
					}),
					defaultValue: "Not started",
				},
				clientId: { type: new GraphQLNonNull(GraphQLString) },
			},
			resolve: async (parent, args) => {
				const { name, description, status, clientId } = args;

				const project = new ProjectModel({
					name,
					description,
					status,
					clientId,
				});

				return await project.save();
			},
		},
		// delete project
		deleteProject: {
			type: ProjectType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLString) },
			},
			resolve: async (parent, args) => await ProjectModel.findByIdAndRemove(args.id),
		},
		// update project
		updateProject: {
			type: ProjectType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLString) },
				name: { type: GraphQLString },
				description: { type: GraphQLString },
				status: {
					type: new GraphQLEnumType({
						name: "ProjectStatusForUpdate",
						values: {
							new: { value: "Not started" },
							prpogress: { value: "In progress" },
							completed: { value: "Completed" },
						},
					}),
				},
				clientId: { type: GraphQLString },
			},
			resolve: async (parent, args) => {
				const { id, name, description, status, clientId } = args;

				return await ProjectModel.findByIdAndUpdate(
					id,
					{ $set: { name, description, status, clientId } },
					{ new: true }
				);
			},
		},
	}),
});

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: mutation,
});
