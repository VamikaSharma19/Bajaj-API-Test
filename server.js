require("dotenv").config();
const express = require("express");
const cors = require("cors");

const bfhlRoute = require("./routes/bfhl");
const healthRoute = require("./routes/health");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/bfhl", bfhlRoute);
app.use("/health", healthRoute);

app.use((err, req, res, next) => {
  res.status(500).json({
    is_success: false,
    error: "Internal Server Error"
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));