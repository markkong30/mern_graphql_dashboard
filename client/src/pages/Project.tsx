import React from "react";
import { Link, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../queries/ProjectQueries";
import ClientInfo from "../components/ClientInfo";
import DeleteModal from "../components/DeleteModal";
import EditProject from "../components/EditProject";

const Project = () => {
	const { id } = useParams();
	const { data, loading, error } = useQuery(GET_PROJECT, {
		variables: {
			id,
		},
	});

	if (loading) return <Spinner />;
	if (error) return <p>Something went wrong...</p>;

	return (
		<>
			{data && (
				<div className="mx-auto w-75 card p-5">
					<Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">
						Back
					</Link>

					<h1>{data.project.name}</h1>
					<p>{data.project.description}</p>

					<h5 className="mt-3">Project Status</h5>
					<p className="lead">{data.project.status}</p>

					<ClientInfo client={data.project.client} />
					<div className="d-flex justify-content-between mt-4">
						<EditProject project={data.project} />
						<DeleteModal projectName={data.project.name} />
					</div>
				</div>
			)}
		</>
	);
};

export default Project;
