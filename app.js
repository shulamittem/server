
require('dotenv').config();
const express = require("express");
const cors = require('cors');
const { request } = require("https");
const workerRouter = require("./routes/worker-router")
const userRouter = require("./routes/user-router")
const branchRouter = require("./routes/branch-router")
const requestRouter = require("./routes/request-router")
const PORT =process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.urlencoded())
app.use(express.json());

//routes
app.use("/worker", workerRouter);
app.use("/user", userRouter);
app.use("/branch", branchRouter);
app.use("/request",requestRouter);

//not found
app.use((req, res) => {
    res.send("oh 404 not found");
});


//הרמת שרת
app.listen(PORT, () => {
    console.log(`connected to port: ${PORT}`);
});