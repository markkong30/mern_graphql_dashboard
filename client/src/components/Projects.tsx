import React from "react";
import { useQuery } from "@apollo/client";
import { IClient, IProject } from "../../types";
import { GET_PROJECTS } from "../queries/ProjectQueries";
import Spinner from "./Spinner";
import ProjectCard from "./ProjectCard";

const Projects = () => {
	const { loading, error, data } = useQuery(GET_PROJECTS);

	if (loading) return <Spinner />;
	if (error) return <p>something went wrong...</p>;

	return (
		<div className="row mt-5">
			{data?.projects.map((project: IProject) => (
				<ProjectCard key={project.id} project={project} />
			))}
		</div>
	);
};

export default Projects;
