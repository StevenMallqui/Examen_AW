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

//- - - - - - - - - - VALIDAR - - - - - - - - - -

const { check, validationResult} = require("express-validator");

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

//- - - - - - - - - - MIDDLEWARES - - - - - - - - - -

app.get("/", (req, res)=>{
    res.status(200);
    res.render("index", {
        title: "ACCESO",
        loginError: false
    });
});

app.post("/cambio", (req, res)=>{
    let existe = usuarios.filter(user => user.user === req.body.user && user.pass === req.body.password).length;

    if(existe){
        res.status(200);
        res.render("cambio",{
            title: "CAMBIO",
            errores: false
        });
    }else{
        res.status(500);
        res.render("index", {
            title: "ACCESO",
            loginError: true
        });  
    }
});

app.post("/nueva-contrasena", [
    check("pass", "La longitud debería ser mayor de 5 caracteres").isLength({min : 6}),
    check("pass", "Debe contener 3 mayúsculas y 2 dígitos").matches(/^(?=(?:.*[A-Z].*){3})(?=(?:.*\d.*){2}).*$/gm),
    check("repass").custom((value, {req}) =>{
        if(value !== req.body.pass){
            throw new Error("Las contraseñas no son iguales");
        }
        return true;
    })
], (req, res)=>{
    const errores = validationResult(req);
    if(errores.isEmpty()){
        res.redirect("/");
    }else{
        res.render("cambio",{
            title: "CAMBIO",
            errores: errores.mapped()
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