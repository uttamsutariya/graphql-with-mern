require("dotenv").config();
const { PORT, NODE_ENV } = require("../config");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const schema = require("./schema/schema");
const connectDB = require("./utils/db");

const app = express();
connectDB();

app.use(
	"/graphql",
	graphqlHTTP({
		schema,
		graphiql: NODE_ENV === "development",
	})
);

app.get("/", (req, res) => {
	res.send("hi");
});

app.listen(PORT, () => {
	console.log(`Server runnning on: ${PORT}`);
});
