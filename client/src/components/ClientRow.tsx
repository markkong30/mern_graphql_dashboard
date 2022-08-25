import React from "react";
import { IClient } from "../../types";
import { FaTrash } from "react-icons/fa";

interface IProps {
	client: IClient;
}

const ClientRow: React.FC<IProps> = ({ client }) => {
	const deleteClient = () => {};

	return (
		<tr>
			<td>{client.name}</td>
			<td>{client.email}</td>
			<td>{client.phone}</td>
			<td>
				<button className="btn btn-danger btn-sm" onClick={deleteClient}>
					<FaTrash />
				</button>
			</td>
		</tr>
	);
};

export default ClientRow;
