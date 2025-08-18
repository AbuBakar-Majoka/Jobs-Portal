const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jobRoutes = require("./routes/jobRoutes");

const app = express();
app.use(cors());


app.use(bodyParser.json());

// Routes
app.use("/api", jobRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
