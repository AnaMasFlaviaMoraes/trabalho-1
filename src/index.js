const express = require("express");

const app = express();

app.use(express.static("public"));

app.set("views", "src/views");

const usuariosRoutes = require("./routers/usuarios-routes");
app.use("/usuarios", usuariosRoutes);

app.get("/", (req, res) => {
  res.send("HOME");
});

app.listen(3000);
