/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes"
import { UserServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
// import { verifyToken } from "../../utils/jwt";
// import { envVars } from "../../config/env";
// import { JwtPayload } from "jsonwebtoken";
// import AppError from "../../errorHelpers/AppError";


// const createUserFunction = async (req: Request, res: Response) => {
//     const user = await UserServices.createUser(req.body)

//     res.status(httpStatus.CREATED).json({
//         message: "User Created Successfully",
//         user
//     })

// }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserServices.createUser(req.body)
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        message: "User Created Successfully",
        data: user,
        success: true,


    })

})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const updateUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    // const token = req.headers.authorization
    // const verfiedToken = verifyToken(token as string, envVars.JWT_ACCESS_TOKEN ) as JwtPayload
    const verfiedToken = req.user;
    const payload = req.body
    const user = await UserServices.updateUser(userId, payload, verfiedToken)
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        message: "User updated Successfully",
        data: user,
        success: true,


    })

})
// const createUser = async (req: Request, res: Response, next: NextFunction) => {
//     try {


//         catchAsync(req, res)


//     } catch (error: any) {
//         // console.log(error)
//         next(error)

//     }


// }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const response = await UserServices.getAllUsers()

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: "Got All Users Successfully",
        data: response.data,
        success: true,
        meta: response.meta


    })
    // res.status(httpStatus.OK).json({
    //     success: true,
    //     message: "All User retrieved successfully",
    //     data: users
    // })
})


export const userController = {
    createUser,
    getAllUsers,
    updateUser
}


// route matching - controlller -> [[[[[[[[services]]]]]]]] -> model -> DB
