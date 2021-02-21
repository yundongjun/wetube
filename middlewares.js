import routes from "./routes";
import multer from "multer";

export const multerVideo = multer({dest:"video/"});

export const localsMiddleware = (req,res,next) => {
    res.locals.siteName = "Wetube";
    res.locals.routes = routes;
    res.locals.user = {
        isAuthenticated: true,
        id: 1
    };
    next();
};

export const uploadVideo = multerVideo.single("videofile");