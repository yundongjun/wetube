import "core-js";
import express from "express";
// const express = require('express'); 
// node_module을 찾는데 express 찾는다
//내파일에서 못찾으면 node_modules파일에서 찾는다
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();

const PORT = 4000;

const handleListening = () => console.log(`Listening or: http://localhost:${PORT}`);

const handlehome = (req,res) => res.send("Hello from home");

const handleProfile = (req,res) => res.send("You are on my profile");

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended : true}));
app.use(helmet());
app.use(morgan("dev"));



app.get("/",handlehome);
app.get("/profile",handleProfile);
app.listen(PORT,handleListening);
