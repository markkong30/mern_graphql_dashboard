import React from "react";
import ClientModal from "../components/ClientModal";
import Projects from "../components/Projects";
import Clients from "../components/Clients";
import ProjectModal from "../components/ProjectModal";

const Home = () => {
	return (
		<div className="px-5">
			<div className="d-flex gap-3">
				<ClientModal />
				<ProjectModal />
			</div>
			<Projects />
			<Clients />
		</div>
	);
};

export default Home;
