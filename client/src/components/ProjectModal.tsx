import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_PROJECT } from "../mutations/ProjectMutations";
import { IClient, IProject, IProjects } from "../../types";
import { GET_PROJECTS } from "../queries/ProjectQueries";
import { GET_CLIENTS } from "../queries/ClientQueries";

const initialFormState = { name: "", description: "", status: "new", clientId: "" };

const ProjectModal = () => {
	const [formData, setFormData] = useState(initialFormState);
	const { data, loading, error } = useQuery(GET_CLIENTS);
	const [addProject] = useMutation(ADD_PROJECT, {
		variables: formData,
		update(cache, { data: { addProject } }) {
			const { projects }: IProjects = cache.readQuery({ query: GET_PROJECTS })!;

			cache.writeQuery({
				query: GET_PROJECTS,
				data: { projects: [...projects, addProject] },
			});
		},
	});

	const submitForm = (
		e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>
	) => {
		e.preventDefault();
		console.log(formData);
		addProject();
		setFormData(initialFormState);
	};

	return (
		<>
			<button
				type="button"
				className="btn btn-primary"
				data-bs-toggle="modal"
				data-bs-target="#addProjectModal"
			>
				<div className="d-flex align-items-center">
					<FaUser className="icon" />
					<div>Add Project</div>
				</div>
			</button>

			<div
				className="modal fade"
				id="addProjectModal"
				aria-labelledby="addProjecttModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="addProjecttModalLabel">
								Add Project
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
									<label className="form-label">Description</label>
									<textarea
										className="form-control"
										name="description"
										id="description"
										value={formData.description}
										onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
									/>
								</div>
								<div className="mb-3">
									<label className="form-label">Status</label>
									<select
										id="status"
										className="form-select"
										name="status"
										value={formData.status}
										onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
									>
										<option value="new">Not Started</option>
										<option value="progress">In Progress</option>
										<option value="completed">Completed</option>
									</select>
								</div>

								<div className="mb-3">
									<label className="form-label">Client</label>
									<select
										id="clientId"
										className="form-select"
										name="clientId"
										value={formData.clientId}
										onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
									>
										<option value="">Select Client</option>
										{data?.clients.map((client: IClient) => (
											<option key={client.id} value={client.id}>
												{client.name}
											</option>
										))}
									</select>
								</div>

								<button
									type="submit"
									data-bs-dismiss="modal"
									className="btn btn-primary"
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

export default ProjectModal;
