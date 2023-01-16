"use strict";

const path = require("path");
const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, "views")));

var usuarios = [
    {nombre: "Aitor", apellidos: "Tilla Patata", user: "aitor01", pass: "ATP01"},
    {nombre: "Carmelo", apellidos: "Cotón Partido", user: "carmelo02", pass: "CCP02"},
    {nombre: "Mirella", apellidos: "Baila Sola", user: "mirella03", pass: "MB503"},
    {nombre: "Felipe", apellidos: "Lotas Blandas", user: "felipe04", pass:"FLB04"}
    ]

app.get('/', (req, res, next) => {
    res.render('login', { msg: false });
  });

app.listen(3000, function(err){
    if(err){
        console.log("Error al iniciar el servidor");
    }else{
        console.log(`Servidor arrancado en el puerto ${3000}`);
    }
})