import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import { IsActive, IUser } from "../modules/user/user.interface";
import { generateToken, verifyToken } from "./jwt";
import { User } from "../modules/user/user.model";
import AppError from "../errorHelpers/AppError";
import httpStatus from "http-status-codes"
export const createUserTokens = (user: Partial<IUser>) => {

    const jwtPayload = {
        email: user.email,
        role: user.role,
        userId: user._id
    }

    // const accessToken = jwt.sign(jwtPayload, "secret", { expiresIn: "20s" })
    const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_TOKEN, envVars.JWT_ACCESS_EXPIRES)

    const refreshToken = generateToken(jwtPayload, envVars.JWT_REFRESH_TOKEN, envVars.JWT_REFRESH_EXPIRES)

    return { accessToken, refreshToken }
}



export const createAccessTokenWithRefreshToken =async (refreshToken: string)=>{
    const verifiedRefreshToken= verifyToken(refreshToken, envVars.JWT_REFRESH_TOKEN) as JwtPayload
  

   
    const isUserExist = await User.findOne({ email: verifiedRefreshToken.email })
    if (!isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "User does not exist exists")
    }
    if (isUserExist.isActive === IsActive.BLOCKED || isUserExist.isActive === IsActive.INACTIVE) {
        throw new AppError(httpStatus.BAD_REQUEST, `User is ${isUserExist.isActive}`)
    }
    if (isUserExist.isDeleted) {
        throw new AppError(httpStatus.BAD_REQUEST, "User does not exist")
    }
   


    // const userToken = createUserTokens(isUserExist)
    const jwtPayload = {
        email: isUserExist.email,
        role: isUserExist.role,
        userId: isUserExist._id
    }

    // const accessToken = jwt.sign(jwtPayload, "secret", { expiresIn: "20s" })
    const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_TOKEN, envVars.JWT_ACCESS_EXPIRES)

    return accessToken
}