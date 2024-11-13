import {z} from "zod"
export const registerControllerSchema=z.object({
    email:z.string().email(),
    username:z.string().min(3).max(20),
    password:z.string().min(6).max(25)
})

export type TRegisterControllerInput=z.TypeOf<typeof registerControllerSchema>;

export const LoginControllerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(25),
  });
  export type TLoginControllerInput = z.TypeOf<typeof LoginControllerSchema>;
  
  export const LogoutControllerSchema = z.object({});
  export type TLogoutControllerInput = z.TypeOf<typeof LogoutControllerSchema>;

  export const UpdateRoleControllerSchema=z.object({
    userId:z.string(),
    userRole:z.enum(["user","admin"])
  })
  export type TUpdateRoleControllerInput=z.TypeOf<typeof UpdateRoleControllerSchema>