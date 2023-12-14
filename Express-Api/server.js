const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
// Routers import
const photoRouter = require("./routers/photosRouter");

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

const app = express();
app.use(cors(corsOptions));

// Rotte per l'entità photo
app.use("/photo", photoRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port http://localhost:" + process.env.PORT);
});
