"use strict";
const { render } = require("ejs");
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

//____________________________________ EJERCICIO 2 ____________________________________

//- - - - - - - - - - DATOS - - - - - - - - - -

var encuestas = [];

//- - - - - - - - - - MIDDLEWARES - - - - - - - - - -

app.get("/", (req, res)=>{
    res.status(200);
    res.render("home",{
        title: "CAMPAÑA NAVIDAD"
    });
});

app.post("/gracias", (req, res)=> {
    encuestas.push({
        edad : req.body.edad,
        canal: req.body.canal,
        lugar: req.body.lugar 
    });
    console.log(encuestas);
    res.render("gracias");
});

app.get("/resultados", (req, res)=>{
    res.render("resultados", {
       title: "RESULTADOS",
       encuestas: encuestas 
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