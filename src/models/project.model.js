const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
		},
		description: {
			type: String,
			trim: true,
			required: true,
		},
		status: {
			type: String,
			trim: true,
			enum: ["Not started", "In progress", "Completed"],
		},
		clientId: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: "Client",
		},
	},
	{
		versionKey: false,
	}
);

module.exports = mongoose.model("Project", ProjectSchema);
