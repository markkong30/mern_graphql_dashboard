import React from "react";
import { FaEnvelope, FaPhone, FaIdBadge } from "react-icons/fa";
import { IClient } from "../../types";

interface IProps {
	client: IClient;
}

const ClientInfo: React.FC<IProps> = ({ client }) => {
	return (
		<>
			<h5 className="mt-5">Client Information</h5>
			<ul className="list-group">
				<li className="list-group-item">
					<FaIdBadge className="icon" color="#7430f9" /> {client.name}
				</li>
				<li className="list-group-item">
					<FaEnvelope className="icon" color="#D500F9" /> {client.email}
				</li>
				<li className="list-group-item">
					<FaPhone className="icon" color="#df3ca6" /> {client.phone}
				</li>
			</ul>
		</>
	);
};

export default ClientInfo;
