require("dotenv").config();
require("express-async-errors");
const weldRoutes = require("./routes/weldRoutes");
//express
const express = require("express");
const app = express();
//packages
const morgan = require("morgan");
//database
const connectDB = require("./db/connect");

//errorhandler- middleware
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");

//use
app.use(morgan("tiny"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Weld");
});

app.use("/api/v1/welds", weldRoutes);

app.use(errorHandlerMiddleware);
app.use(notFound);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
