const express = require("express");
const logger = require('morgan'); //DUDA: why we installed morgan?
const createError = require("http-errors");
// Creamos la aplicación servidor ejecutando express como una función
const app = express();

require("./config/db.config");
require("./config/hbs.config")

// Configuracion de la vista
app.set('views', `${__dirname}/views`);
app.set('view engine', 'hbs');

app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({ extended: false })); //para que la web recoja el body de las peticiones post

// Router configuration
const routes = require("./config/routes.config.js");
app.use("/", routes);

// Error handling 404
app.use((req, res, next) => {
    next(createError(404, "Page not found"));
});
  
// Error handling 500
app.use((error, req, res, next) => {
    console.error(error);
    const message = error.message;
    const metadata = app.get("env") === "development" ? error : {};
    const status = error.status || 500;
    res.status(status).render(`errors/500`, { message, metadata });
});



app.listen(3000, () => console.log('on port 3000'))