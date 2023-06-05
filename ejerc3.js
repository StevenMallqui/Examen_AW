"use strict";
const { render } = require("ejs");
const config = require("./config")
const express = require("express");
const app = express();
//- - - - - - - - - - DATOS JSON - - - - - - - - - -
const data = require("./ofertas.json");
app.use(express.json());
app.use(express.urlencoded({extended: true}))

//- - - - - - - - - - VISTAS Y USO DEL MOTOR DE PLANTILLAS - - - - - - - - - -

const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//- - - - - - - - - - ARCHIVOS ESTÁTICOS - - - - - - - - - -

app.use(express.static(path.join(__dirname, "public")));

//____________________________________ EJERCICIO 3 ____________________________________

//- - - - - - - - - - MIDDLEWARES - - - - - - - - - -

app.get("/", (req, res)=>{
    res.status(200);
    res.render("tienda",{
        title: "TIENDA"
    });
});

app.get("/ofertas", (req, res)=>{
    res.render("ofertas",{
        title: "OFERTAS",
        data: data
    });
});

//_____________________________________________________________________________________

//- - - - - - - - - - CONEXIÓN CON EL SERVIDOR - - - - - - - - - -

app.listen(config.port, function(err){
    if(err){
        console.log("ERROR al iniciar el servidor");
    }
    else{
        console.log(`Servidor arrancado en el puerto ${config.port}`);
    }
});