import { ApolloClient, InMemoryCache } from "@apollo/client";

const cache = new InMemoryCache({
	typePolicies: {
		Query: {
			fields: {
				clients: {
					merge(existing, incoming) {
						return incoming;
					},
				},
				projects: {
					merge(existing, incoming) {
						return incoming;
					},
				},
			},
		},
	},
});

export const client = new ApolloClient({
	uri: process.env.REACT_APP_APOLLO_URL,
	cache,
});
