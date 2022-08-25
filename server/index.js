const express = require("express");
const colors = require("colors");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const schema = require("./schema/schema");
const db = require("./config/db");
const port = process.env.PORT || 5000;
require("dotenv").config();

const app = express();
app.use(cors());
db();

app.use(
	"/graphql",
	graphqlHTTP({
		schema,
		graphiql: true,
	})
);

app.listen(port, console.log(`Server running on port ${port}`));
