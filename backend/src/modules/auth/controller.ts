import { NextFunction, Request, Response } from "express";
import { LoginControllerSchema, registerControllerSchema, UpdateRoleControllerSchema } from "./validation";
import { createUserService, getUserById, loginService, updateRoleService } from "./service";
import { APIError } from "../../utils/error";


export async function registerController(req:Request,res:Response,next:NextFunction){
try {
    const body=req.body
    const{success,error,data}=registerControllerSchema.safeParse(body);
    if(!success){
        const errors=error.flatten().fieldErrors;
        res.status(400).json({
            message:"Invalid request",
            data:"null",
            isSuccess:false,
            errors:errors,
        })
        return;
    }
    const user=await createUserService(data);
    res.status(201).json({
        message:"user registered successfully",
        isSuccess:true,
        data:{
            username:user.username,
            id:user._id,
            email:user.email,
        },
    });
    
} catch (error) {
    if (error instanceof APIError) {
      next(error);
    } else {
      next(new APIError(500, (error as Error).message));
    }
}
}

export async function loginController(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const body = req.body;
  
      const { success, error, data } = LoginControllerSchema.safeParse(body);
      if (!success) {
        const errors = error.flatten().fieldErrors;
        res.status(400).json({
          message: "Invalid request",
          data: null,
          isSuccess: false,
          errors: errors,
        });
        return;
      }
  
      const loginOutput = await loginService(data);
  
      res.cookie("token", loginOutput.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 1000 * 60 * 60, // 1 hour
        path: "/",
      });
  
      res.status(200).json({
        message: "User logged in successfully",
        isSuccess: true,
        data: loginOutput,
      });
    } catch (error) {
      if (error instanceof APIError) {
        next(error);
      } else {
        next(new APIError(500, (error as Error).message));
      }
    }
  }
   export async function logoutController(
    req:Request,
    res:Response,
    next:NextFunction
   ){
    try {
    
res.clearCookie("token");
res.status(200).json({
    message:"User logged out successfully",
    isSuccess:true,
    data:null,
});
    
   } catch (error) {
    if(error instanceof APIError){
        next(error);
    }else{
        next(new APIError(500,(error as Error).message));
    }
   }
}

export async function meController(
    req:Request,
    res:Response,
    next:NextFunction
){
try {
    if(!req.user){
        res.status(401).json({
            message:"User not found",
            isSuccess:false,
            data:null,
        });
        return;
    }
    const user=await getUserById(req.user.id)

    res.status(200).json({
        message:"User retrieved successfully",
        isSuccess:true,
        data:{
            id: user._id,
            username: user.username,
            email:user.email,
            role:user.role,
        }
    });
} catch (error) {
    if(error instanceof APIError){
        next(error);
    }else{
        next(new APIError(500,(error as Error).message));
    }
    
}
}
export async function userUpdateController(
  req:Request,
  res:Response,
  next:NextFunction
){
  try {
    const body = req.body;
    const { success, error, data } = UpdateRoleControllerSchema.safeParse(body);
    if (!success) {
      const errors = error.flatten().fieldErrors;
      res.status(400).json({
        message: "Invalid request",
        data: null,
        isSuccess: false,
        errors: errors,
      });
      return;
    }
const role= await updateRoleService(data);
res.status(201).json({
  message:"Role Updated Successfully",
  data:null,
  isSuccess:true
})
  }
    catch (error) {
      if(error instanceof APIError){
          next(error);
      }else{
          next(new APIError(500,(error as Error).message));
      }
  }
}