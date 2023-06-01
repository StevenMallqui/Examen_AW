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

//____________________________________ EJERCICIO 1 ____________________________________

//- - - - - - - - - - BASE DE DATOS - - - - - - - - - -

var usuarios = [
    {nombre: "Aitor", apellidos: "Tilla Patata", user:"aitor01", pass:
    "ATP01"},
    {nombre: "Carmelo", apellidos: "Cotón Partido", user:"carmelo02", pass:
    "CCP02"},
    {nombre: "Mirella", apellidos: "Baila Sola", user:"mirella03", pass:
    "MBS03"},
    {nombre: "Felipe", apellidos: "Lotas Blandas", user:"felipe04", pass:
    "FLB04"}
]

//- - - - - - - - - - ROUTERS - - - - - - - - - -

app.get("/", (req, res) =>{
    res.status(200);
    res.render("index", {
        title: "ACCESO"
    });
});

app.post("/cambio", function(req, res){
    let existe = usuarios.filter(user => user.user === req.body.user && user.pass === req.body.password).length;

    if(existe){
        res.render("cambio",{
            title : "CAMBIO"
        });
    }else{
        res.render("index",{
            title: "ACCESO"
        });
    }
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