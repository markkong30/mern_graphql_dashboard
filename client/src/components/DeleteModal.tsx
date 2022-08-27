import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_PROJECT } from "../mutations/ProjectMutations";
import { useNavigate, useParams } from "react-router-dom";

interface IProps {
	projectName: string;
}

const DeleteModal: React.FC<IProps> = ({ projectName }) => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [deleteProject] = useMutation(DELETE_PROJECT, {
		variables: {
			id,
		},
		onCompleted: () => navigate("/"),
	});

	return (
		<div className="d-flex mt-5">
			<button
				type="button"
				className="btn btn-danger px-3 py-2 d-flex gap- align-items-center"
				data-bs-toggle="modal"
				data-bs-target="#deleteModal"
			>
				<FaTrash className="icon" />
				Delete Project
			</button>

			<div
				className="modal fade"
				id="deleteModal"
				aria-labelledby="deleteModalLabel"
				aria-hidden="true"
			>
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title fs-5 text-black-50" id="deleteModalLabel">
								Are you sure to delete
								<span className="fw-bold text-black"> {projectName}</span> ?
							</h5>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							></button>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
								Close
							</button>
							<button
								type="button"
								className="btn btn-danger"
								data-bs-dismiss="modal"
								onClick={() => deleteProject()}
							>
								Confirm
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DeleteModal;
