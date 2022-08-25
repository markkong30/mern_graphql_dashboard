import React from "react";
import Header from "./components/Header";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo";
import Clients from "./components/Clients";

const App = () => {
	return (
		<ApolloProvider client={client}>
			<Header />
			<Clients />
		</ApolloProvider>
	);
};

export default App;
