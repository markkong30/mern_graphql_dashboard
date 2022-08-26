import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { ADD_CLIENT } from "../mutations/ClientMutations";
import { IClients } from "../../types";
import { GET_CLIENTS } from "../queries/ClientQueries";

const initialFormState = { name: "", email: "", phone: "" };

const ClientModal = () => {
	const [formData, setFormData] = useState(initialFormState);
	const [addClient, { data, loading, error }] = useMutation(ADD_CLIENT, {
		variables: formData,
		update(cache, { data: { addClient } }) {
			const { clients }: IClients = cache.readQuery({ query: GET_CLIENTS })!;

			cache.writeQuery({
				query: GET_CLIENTS,
				data: { clients: [...clients, addClient] },
			});
		},
	});

	const submitForm = (
		e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
	) => {
		e.preventDefault();
		console.log(formData);
		addClient();
		setFormData(initialFormState);
	};

	return (
		<>
			<button
				type="button"
				className="btn btn-secondary"
				data-bs-toggle="modal"
				data-bs-target="#addClientModal"
			>
				<div className="d-flex align-items-center">
					<FaUser className="icon" />
					<div>Add Client</div>
				</div>
			</button>

			<div
				className="modal fade"
				id="addClientModal"
				aria-labelledby="addClientModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="addClientModalLabel">
								Add Client
							</h5>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div className="modal-body">
							<form onSubmit={submitForm}>
								<div className="mb-3">
									<label className="form-label">Name</label>
									<input
										type="text"
										className="form-control"
										name="name"
										id="name"
										value={formData.name}
										onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
									/>
								</div>
								<div className="mb-3">
									<label className="form-label">Email</label>
									<input
										type="email"
										className="form-control"
										name="email"
										id="email"
										value={formData.email}
										onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
									/>
								</div>
								<div className="mb-3">
									<label className="form-label">Phone</label>
									<input
										type="text"
										className="form-control"
										name="phone"
										id="phone"
										value={formData.phone}
										onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
									/>
								</div>

								<button
									type="submit"
									data-bs-dismiss="modal"
									className="btn btn-secondary"
									onClick={submitForm}
								>
									Submit
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ClientModal;
