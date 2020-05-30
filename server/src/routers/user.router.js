import {Router} from "express";
import {checkToken} from "../middlewares/auth";
import {login,register,getListUser} from "../controllers/user.controller";
const router = Router();

router.post("/login",login);
router.post("/register",register);
router.get("/",checkToken,getListUser);


export default router;