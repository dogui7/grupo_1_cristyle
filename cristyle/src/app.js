const express = require ("express");
const app = express ();
const path = require ("path");
const methodOverride = require('method-override');

// Initial config
app.set("port", process.env.PORT || 3500);
app.listen (app.get("port"), () => console.log ("Server running in http://localhost:" + app.get("port")));

// Middlewares Aplication
app.use(express.static (path.resolve (__dirname, "../public")));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));

// Routes
const mainRouter = require("./routes/main");
app.use("/", mainRouter);

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

const productsRouter = require("./routes/products");
app.use("/products", productsRouter);

//Usar esta ruta para testear cosas en las rutas /t/1, /t/2, etc
const testsRouter = require("./routes/tests");
app.use("/t", testsRouter);