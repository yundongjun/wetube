import "core-js";
import express, { Router } from "express";
// const express = require('express'); 
// node_module을 찾는데 express 찾는다
//내파일에서 못찾으면 node_modules파일에서 찾는다
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";
const app = express();
// middleware - 여긴 어플리케이션 (req,res)사용하면 미들웨어
app.set("view engine", "pug");
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended : true}));
app.use(helmet());
app.use(morgan("dev"));
// Router => get,post
app.use(routes.home,globalRouter);
app.use(routes.users,userRouter);
app.use(routes.videos,videoRouter);
//app object를 만들어낸다
export default app;