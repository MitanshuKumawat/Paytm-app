// express servers

const express = require("express");
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

const mainRouter = require("./routes/index");

//Mount the router to handle all the requests under /api/v1
app.use('/api/v1', mainRouter);

app.listen(3000);