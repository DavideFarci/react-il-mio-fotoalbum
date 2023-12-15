const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
// Routers import
const photosRouter = require("./routers/admin/photosRouter");
const categoriesRouter = require("./routers/admin/categoriesRouter");
const emailRouter = require("./routers/admin/emailRouter");
const usersRouter = require("./routers/admin/usersRouter");
const photosRouterGuest = require("./routers/guest/photoRouterGuest");

// Middlewares import
const routeNotFoundMiddlware = require("./middlewares/routeNotFound");

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static("public"));

// Rotte per l'entità photo ADMIN
app.use("/admin/photo", photosRouter);
// Rotte per l'entità photo GUEST
app.use("/photo", photosRouterGuest);
// Rotte per l'entità categorie
app.use("/categories", categoriesRouter);
// Rotte per l'entità messaggi
app.use("/email", emailRouter);
// Rotte per gli user (non specifico un percorso per rendere più pulito l'url)
app.use("", usersRouter);

// Errore 404 - Pagina non trovata
app.use(routeNotFoundMiddlware);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port http://localhost:" + process.env.PORT);
});
