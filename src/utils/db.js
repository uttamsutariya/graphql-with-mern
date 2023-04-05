const mongoose = require("mongoose");

const { DB_URL } = require("../../config");

const connectDB = () => {
	mongoose.set("strictQuery", true);
	mongoose
		.connect(DB_URL)
		.then((res) =>
			console.log(
				`db connected to: ${res.connection.host}:${res.connection.port}/${res.connection.db.databaseName}`
			)
		)
		.catch((error) => {
			console.log(`DB connection failed due to: ${error.message}`);
			process.exit(1);
		});
};

module.exports = connectDB;
