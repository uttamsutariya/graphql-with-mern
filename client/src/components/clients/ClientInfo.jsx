import { FaIdBadge, FaEnvelope, FaPhone } from "react-icons/fa";

const ClientInfo = ({ client }) => {
	const { name, email, phone } = client;

	return (
		<div>
			<ul>
				<li className={styles.li}>
					<FaIdBadge className="inline me-3 text-xl" /> {name}
				</li>
				<li className={styles.li}>
					<FaEnvelope className="inline me-3 text-xl" /> {email}
				</li>
				<li className={styles.li}>
					<FaPhone className="inline me-3 text-xl" /> {phone}
				</li>
			</ul>
		</div>
	);
};

const styles = {
	li: "p-3 bg-blue-300 my-1 rounded-md w-[50%] text-black",
};

export default ClientInfo;
