import express, { NextFunction, Request, Response } from "express"
import cors from "cors"
import { bookRouter } from "./modules/book/router"
import { reviewRouter } from "./modules/review/router"
import cookieParser from "cookie-parser"
import { APIError } from "./utils/error"
import { env } from "./utils/config"
import { createDBConnection } from "./utils/db"
import { authRoute } from "./modules/auth/router"

createDBConnection()
  .then((db) => console.log("connected to db"))
  .catch((err) => {
    console.error("failed to connect to db", err);
  });

const app=express()
//hello
app.use(
    cors({
    origin:["http://localhost:5173",
      "https://book-review-app-i2tx.vercel.app"
    ],
    credentials:true,
}))

app.use(express.json())
app.use(cookieParser())
app.get("/",(req:Request,res:Response,next:NextFunction)=>{
    res.json({
        message:"Welcome to Book Review App",
        data:null,
        isSuccess:true,
    })
})
app.use("/api/auth",authRoute)
app.use("/api/books",bookRouter)
app.use("/api/review",reviewRouter)

app.use((error:APIError, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  if (error instanceof APIError) {
    res.status(error.status).json({
      message: error.message,
      data: null,
      isSuccess: false,
    });
    return;
  }
  res.status(500).json({
    message: "Internal server error",
    data: null,
    isSuccess: false,
  });
});
app.listen(env.PORT, () =>
    console.log(`Server started on: http://localhost:${env.PORT}`)
  );