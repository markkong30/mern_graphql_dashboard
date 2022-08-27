import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { GET_PROJECT } from "../queries/ProjectQueries";
import { UPDATE_PROJECT } from "../mutations/ProjectMutations";
import { IProject } from "../../types";

interface IProps {
	project: IProject;
}

const EditProject: React.FC<IProps> = ({ project }) => {
	const [name, setName] = useState(project.name);
	const [description, setDescription] = useState(project.description);
	const [status, setStatus] = useState(() => {
		switch (project.status) {
			case "Not Started":
				return "new";
			case "In Progress":
				return "progress";
			case "Completed":
				return "completed";
			default:
				throw new Error(`Unknown status: ${project.status}`);
		}
	});

	const [updateProject] = useMutation(UPDATE_PROJECT, {
		variables: { id: project.id, name, description, status },
		refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
	});

	const onSubmit = (e: React.MouseEvent<HTMLButtonElement> | React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(project.id);
		if (!name || !description || !status) {
			return alert("Please fill out all fields");
		}

		updateProject();
	};

	return (
		<div className="">
			<button
				type="button"
				className="btn btn-secondary px-3 py-2 d-flex gap-1 align-items-center"
				data-bs-toggle="modal"
				data-bs-target="#updateModal"
			>
				<FaTrash className="icon" />
				Update Project
			</button>

			<div
				className="modal fade"
				id="updateModal"
				aria-labelledby="updateModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title fs-5 text-black-50" id="updateModalLabel">
								Update Project Details
							</h5>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div className="modal-body">
							<form onSubmit={onSubmit}>
								<div className="mb-3">
									<label className="form-label">Name</label>
									<input
										type="text"
										className="form-control"
										id="name"
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
								</div>
								<div className="mb-3">
									<label className="form-label">Description</label>
									<textarea
										className="form-control"
										id="description"
										value={description}
										onChange={(e) => setDescription(e.target.value)}
									></textarea>
								</div>
								<div className="mb-3">
									<label className="form-label">Status</label>
									<select
										id="status"
										className="form-select"
										value={status}
										onChange={(e) => setStatus(e.target.value)}
									>
										<option value="new">Not Started</option>
										<option value="progress">In Progress</option>
										<option value="completed">Completed</option>
									</select>
								</div>
							</form>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
								Close
							</button>
							<button
								type="button"
								className="btn btn-danger"
								data-bs-dismiss="modal"
								onClick={onSubmit}
							>
								Update
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditProject;
