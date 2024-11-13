import Router from "express";
import { loginController, logoutController, meController, registerController, userUpdateController } from "./controller";
import { checkAuth } from "./middleware";

function createAuthRouter(){
    const router=Router()
    router.post("/register",registerController )
    router.post("/login",loginController);
    router.post("/logout",logoutController);
    router.get("/me",checkAuth,meController)
    router.post("/update-user",userUpdateController)
return router;
}
export const authRoute=createAuthRouter()