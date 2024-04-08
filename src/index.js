const express = require("express");

const app = express();

// SISTEMA WEB SERVER SIDE RENDERING
app.use(express.urlencoded({
  extended: false
}));
// API REST
app.use(express.json());


const path = require('path');
app.use(express.static(path.join(__dirname,"/public")));

app.set('view engine', 'ejs');
app.set("views", __dirname + "/views");

const usuariosRoutes = require("./routers/usuarios-routes");
app.use("/usuarios", usuariosRoutes);

app.get("/", (req, res) => res.render("home"));

app.listen(3000);





