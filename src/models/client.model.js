const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
		},
		email: {
			type: String,
			trim: true,
			required: true,
		},
		phone: {
			type: String,
			trim: true,
			required: true,
		},
	},
	{
		versionKey: false,
	}
);

module.exports = mongoose.model("Client", ClientSchema);
