import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<div className="navbar shadow-lg bg-base-300 px-10 rounded-md mt-5">
			<Link to={"/"} className="font-semibold text-xl">
				<img src={Logo} alt="" className="w-10 me-2" />
				Project Management
			</Link>
		</div>
	);
};

export default Header;
