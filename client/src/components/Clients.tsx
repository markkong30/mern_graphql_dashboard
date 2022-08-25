import { useQuery } from "@apollo/client";
import React from "react";
import { IClient } from "../../types";
import { GET_CLIENTS } from "../queries/ClientQueries";
import ClientRow from "./ClientRow";

const Clients = () => {
	const { loading, error, data } = useQuery(GET_CLIENTS);

	console.log(data);

	if (loading) return <p>loading...</p>;
	if (error) return <p>something went wrong...</p>;

	return (
		<div className="px-5">
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
					{data.clients.map((client: IClient) => (
						<ClientRow key={client.id} client={client} />
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Clients;
