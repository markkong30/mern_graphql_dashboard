import React from "react";
import Header from "./components/Header";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { client } from "./apollo";
import Clients from "./components/Clients";
import Projects from "./components/Projects";
import ClientModal from "./components/ClientModal";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Project from "./pages/Project";

const App = () => {
	return (
		<ApolloProvider client={client}>
			<Router>
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/projects/:id" element={<Project />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Router>
		</ApolloProvider>
	);
};

export default App;
