const Projects = require("../models/Project");
const Clients = require("../models/Client");

const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLSchema,
	GraphQLList,
	GraphQLNonNull,
	GraphQLEnumType,
} = require("graphql");

const ProjectType = new GraphQLObjectType({
	name: "Project",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		description: { type: GraphQLString },
		status: { type: GraphQLString },
		client: {
			type: ClientType,
			resolve(parent, args) {
				return Clients.findById(parent.clientId);
			},
		},
	}),
});

const ClientType = new GraphQLObjectType({
	name: "Client",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		email: { type: GraphQLString },
		phone: { type: GraphQLString },
	}),
});

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		projects: {
			type: new GraphQLList(ProjectType),
			resolve() {
				return Projects.find();
			},
		},
		project: {
			type: ProjectType,
			args: {
				id: { type: GraphQLID },
			},
			resolve(parent, args) {
				return Projects.findById(args.id);
			},
		},
		clients: {
			type: new GraphQLList(ClientType),
			resolve() {
				return Clients.find();
			},
		},
		client: {
			type: ClientType,
			args: {
				id: { type: GraphQLID },
			},
			resolve(parent, args) {
				return Clients.findById(args.id);
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
});
