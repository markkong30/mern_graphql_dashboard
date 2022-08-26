import { CSSProperties } from "react";
import { RingLoader } from "react-spinners";

const override: CSSProperties = {
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	// margin: "10% auto",
	color: "#35D7B7",
	borderColor: "#35D7B7",
	// borderColor: "red",
};

const Spinner = () => {
	return (
		<div
			className="d-flex w-100 justify-content-center align-items-center flex-column gap-4"
			style={{ height: "50vh" }}
		>
			<RingLoader cssOverride={override} color="#35D7B7" size={120} />
			<p className="text-primary text-center fs-4 fw-bold">Loading ...</p>
		</div>
	);
};

export default Spinner;
