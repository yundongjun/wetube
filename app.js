import "core-js";
import express from "express";
// const express = require('express'); 
// node_module을 찾는데 express 찾는다
//내파일에서 못찾으면 node_modules파일에서 찾는다
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import {localsMiddleware} from "./middlewares";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";
const app = express();
// middleware - 여긴 어플리케이션 (req,res)사용하면 미들웨어
app.use(
    helmet({
    contentSecurityPolicy: false,
    }));
 //보안
app.set("view engine", "pug"); // 퍼그 모듈을 가져오는거
app.use("/uploads",express.static("uploads"));
app.use(cookieParser());//쿠키 배열화
app.use(bodyParser.urlencoded({extended : true}));
//그치만 body-parser를 쓰면 bodyParser.urlencoded()를 등록하면, 자동으로 req에 body속성이 추가되고 저장된다. 만약 urls에 접근하고싶다면, req.body.urls이다. 인코딩도 default로 UTF-8로 해준다. 이벤트등록할 필요 자체가 사라진다.
app.use(morgan("dev"));//콘솔에 남기는 GET /login 304 15.535 ms - -
// GET /login 200 17.650 ms - 697 이런값

app.use(localsMiddleware);
app.use(function(req, res, next) {
    res.setHeader("Content-Security-Policy", "script-src 'self' https://archive.org");
    return next();
    });
// Router => get,post
app.use(routes.home,globalRouter);
app.use(routes.users,userRouter);
app.use(routes.videos,videoRouter);
//app object를 만들어낸다
export default app;