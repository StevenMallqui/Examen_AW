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