import React from "react";
import { useQuery } from "@apollo/client";
import { IClient } from "../../types";
import { GET_CLIENTS } from "../queries/ClientQueries";
import ClientRow from "./ClientRow";
import Spinner from "./Spinner";

const Clients = () => {
	const { loading, error, data } = useQuery(GET_CLIENTS);

	if (loading) return <Spinner />;
	if (error) return <p>something went wrong...</p>;

	return (
		<table className="table table-hover mt-3">
			<thead>
				<tr>
					<th>Name</th>
					<th>Email</th>
					<th>Phone</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{data?.clients.map((client: IClient) => (
					<ClientRow key={client.id} client={client} />
				))}
			</tbody>
		</table>
	);
};

export default Clients;
