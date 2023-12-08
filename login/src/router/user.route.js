import { Router } from "express";
import * as userControllers from "../controllers/user.controllers.js";
import { validateLogin } from "../middlewares/validateLogin.js";

const routerUser = Router();

routerUser.post('/register', userControllers.register);

routerUser.post("/login", userControllers.login);

routerUser.get("/logout", userControllers.logout);


export default routerUser;

//Agregar validaciones a las rutas de vistas para que, si aún no estoy logueado, no pueda entrar a ver mi perfil, y si ya estoy logueado, no pueda volver a loguearme o registrarme.
//En la vista de perfil, se deben arrojar los datos no sensibles del usuario que se haya logueado.
