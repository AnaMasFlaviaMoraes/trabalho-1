const express = require("express");

const app = express();

app.use(express.urlencoded({
  extended: false
}));

app.use(express.json());

const path = require('path');
app.use(express.static(path.join(__dirname,"/public")));

app.set('view engine', 'ejs');
app.set("views", __dirname + "/views");

const usuariosRoutes = require("./routers/usuarios-routes");
app.use("/usuarios", usuariosRoutes);

app.get("/", usuariosRoutes);

app.listen(3000);





