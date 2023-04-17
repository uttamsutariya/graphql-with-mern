const ConfirmBox = () => {
	return (
		<>
			<input type="checkbox" id="confirm" className="modal-toggle" />
			<div className="modal">
				<div className="modal-box">
					<h3 className="font-bold text-lg">Are you sure want to delete ?</h3>
					<p className="py-4">It will not be reversible</p>
					<div className="modal-action">
						<button htmlFor="confirm" className="btn">
							Yes
						</button>
						{/* <button htmlFor="confirm" className="btn">
							No
						</button> */}
					</div>
				</div>
			</div>
		</>
	);
};

export default ConfirmBox;
