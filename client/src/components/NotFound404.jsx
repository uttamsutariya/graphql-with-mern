import { useNavigate } from "react-router-dom";

const NotFound404 = () => {
	const navigate = useNavigate();

	return (
		<div className="mt-10">
			<button onClick={() => navigate(-1)} className="btn bg-purple-500">
				Back
			</button>
			<div className="text-center mt-10">
				<p className="text-9xl font-extrabold">404</p>
				<p className="text-6xl font-bold">Page Not found</p>
			</div>
		</div>
	);
};

export default NotFound404;
