const express = require("express");
const cors = require("cors");

const serverless = require("serverless-http");

const router = require("../routes/routes");
const connectDb = require("../config/dbConfig");

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.static("public")); //recommended by stripe

connectDb().then(() =>
  // app.listen(3000, () => console.log("Server running at port 3000"))
  app.use("/", router)
);
module.exports.handler = serverless(app);
