"use strict";
const config = require("./config")
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))


//- - - - - - - - - - VISTAS Y USO DEL MOTOR DE PLANTILLAS - - - - - - - - - -
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//- - - - - - - - - - ARCHIVOS ESTÁTICOS - - - - - - - - - -
app.use(express.static(path.join(__dirname, "public")));

//- - - - - - - - - - PAGINA PRINCIPAL - - - - - - - - - -

app.get("/", (req, res) =>{
    res.status(200);
    res.render("index", {
        title: "AW-2023"
    });
});

app.post("/cambio", function(req, res){
    
});

//- - - - - - - - - - CONEXIÓN CON EL SERVIDOR - - - - - - - - - -

app.listen(config.port, function(err){
    if(err){
        console.log("ERROR al iniciar el servidor");
    }
    else{
        console.log(`Servidor arrancado en el puerto ${config.port}`);
    }
});