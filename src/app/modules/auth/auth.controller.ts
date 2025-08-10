/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { sendResponse } from "../../utils/sendResponse"
import httpStatus from "http-status-codes"
import { AuthServices } from "./auth.service"
import AppError from "../../errorHelpers/AppError"
import { setAuthCookie } from "../../utils/setCookie"
import { JwtPayload } from "jsonwebtoken"
import { createUserTokens } from "../../utils/userToken"
import { envVars } from "../../config/env"
import passport from "passport"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const credentialsLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    // const response = await UserServices.getAllUsers()
    // console.log(req.body)

    passport.authenticate("local", async (error: any, user: any, info: any) => {

        if (error) {

            // return new AppError(401, error)
            return next(new AppError(401, error))

        }
        if (!user) {
            // return new AppError(401, info.message)
            return next(new AppError(401, info.message))
        }

        const userTokens = await createUserTokens(user)
        const { password, ...rest } = user.toObject()
        setAuthCookie(res, userTokens)
        sendResponse(res, {
            statusCode: httpStatus.OK,
            message: "Logged In Successfully",
            data: {
                accessToken: userTokens.accessToken,
                refreshToen: userTokens.refreshToken,
                user: rest
            },
            success: true,


        })

    })(req, res, next)

    // const loginInfo = await AuthServices.credentialsLogin(req.body)
    // `/set auth cookie`

    // res.cookie("accessToken", loginInfo.accessToken, {
    //     httpOnly: true,
    //     secure: false
    // })
    // res.cookie("refreshToken", loginInfo.refreshToken, {
    //     httpOnly: true,
    //     secure: false
    // })




    // res.status(httpStatus.OK).json({
    //     success: true,
    //     message: "All User retrieved successfully",
    //     data: users
    // })
})
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getNewAccessToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    // const response = await UserServices.getAllUsers()
    // console.log(req.body)
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) {
        throw new AppError(httpStatus.BAD_REQUEST, "no refresh token")
    }

    const tokenInfo = await AuthServices.getNewAccessToken(refreshToken as string)


    res.cookie("accessToken", tokenInfo.accessToken, {
        httpOnly: true,
        secure: false
    })
    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: "New access token retrieve Successfully",
        data: tokenInfo,
        success: true,


    })
    // res.status(httpStatus.OK).json({
    //     success: true,
    //     message: "All User retrieved successfully",
    //     data: users
    // })
})
const logout = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })

    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })


    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: "Logged out Successfully",
        data: null,
        success: true,


    })
    // res.status(httpStatus.OK).json({
    //     success: true,
    //     message: "All User retrieved successfully",
    //     data: users
    // })
})
const resetPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {


    const decodedToken = req.user
    const newPassword = req.body.newPassword;
    const oldPassword = req.body.oldPassword;

    const newUpdatedPassword = await AuthServices.resetPassword(oldPassword, newPassword, decodedToken as JwtPayload)


    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: "Password changes successfully Successfully",
        data: null,
        success: true,


    })
    // res.status(httpStatus.OK).json({
    //     success: true,
    //     message: "All User retrieved successfully",
    //     data: users
    // })
})
const googleCallback = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "no user found")
    }

    console.log(user)

    const tokenInfo = await createUserTokens(user)

    setAuthCookie(res, tokenInfo)
    res.redirect(envVars.FRONTEND_URL)
    // const decodedToken = req.user
    // const newPassword = req.body.newPassword;
    // const oldPassword = req.body.oldPassword;

    // const newUpdatedPassword = await AuthServices.resetPassword(oldPassword, newPassword, decodedToken as JwtPayload)


    // sendResponse(res, {
    //     statusCode: httpStatus.OK,
    //     message: "Password changes successfully Successfully",
    //     data: null,
    //     success: true,


    // })
    // res.status(httpStatus.OK).json({
    //     success: true,
    //     message: "All User retrieved successfully",
    //     data: users
    // })
})

const forgetPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {


    const {email} = req.body

    const resut = await AuthServices.forgetPassword(email)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: "Email sent Successfully",
        data: null,
        success: true,


    })
    // res.status(httpStatus.OK).json({
    //     success: true,
    //     message: "All User retrieved successfully",
    //     data: users
    // })
})

export const AuthController = {
    credentialsLogin,
    getNewAccessToken,
    logout,
    resetPassword,
    googleCallback,
    forgetPassword
}