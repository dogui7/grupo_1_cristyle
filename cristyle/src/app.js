const express = require ("express");
const app = express ();
const path = require ("path");

// Initial config
app.set("port", process.env.PORT || 3500);
app.listen (app.get("port"), () => console.log ("Server running in http://localhost:" + app.get("port")));

// Middlewares Aplication
app.use(express.static (path.resolve (__dirname, "../public")));
app.set("view engine", "ejs");

// Routes
const mainRouter = require("./routes/main");
app.use("/", mainRouter);

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

const productsRouter = require("./routes/products");
app.use("/products", productsRouter);