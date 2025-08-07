import AppError from "../../errorHelpers/AppError"
import httpStatus from "http-status-codes"
import { User } from "../user/user.model"
import bcrypt from "bcryptjs"
import { createAccessTokenWithRefreshToken } from "../../utils/userToken"
import { JwtPayload } from "jsonwebtoken"
import { envVars } from "../../config/env"

// const credentialsLogin = async (payload: Partial<IUser>) => {
//     // console.log(payload)

//     const { email, password } = payload
//     const isUserExist = await User.findOne({ email })
//     if (!isUserExist) {
//         throw new AppError(httpStatus.BAD_REQUEST, "Email does not exist exists")
//     }
//     const isPasswordMatched = await bcrypt.compare(password as string, isUserExist.password as string)

//     if (!isPasswordMatched) {
//         throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password")
//     }


//     const userToken = createUserTokens(isUserExist)
//     // const jwtPayload = {
//     //     email: isUserExist.email,
//     //     role: isUserExist.role,
//     //     userId: isUserExist._id
//     // }

//     // // const accessToken = jwt.sign(jwtPayload, "secret", { expiresIn: "20s" })
//     // const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_TOKEN, envVars.JWT_ACCESS_EXPIRES)

//     // const refreshToken = generateToken(jwtPayload, envVars.JWT_REFRESH_TOKEN, envVars.JWT_REFRESH_EXPIRES)
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     const { password: pooo, ...rest } = isUserExist.toObject()

//     return {

//         accessToken: userToken.accessToken,
//         refreshToken: userToken.refreshToken,
//         user: rest

//     }

// }
const getNewAccessToken = async (refreshToken: string) => {
    // console.log(payload)

    const newAccessToken = await createAccessTokenWithRefreshToken(refreshToken)

    return {
        accessToken: newAccessToken

    }

}
const resetPassword = async (oldPassword: string, newPassword: string, decodedToken: JwtPayload) => {
    // console.log(payload)
  const user = await User.findById(decodedToken.userId) 
    const isOldPasswordMatch= await bcrypt.compare(oldPassword, user?.password as string) 

    if (!isOldPasswordMatch) {
        throw new AppError(httpStatus.UNAUTHORIZED, "old password does no matched")
    }

   // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
   user!.password = await bcrypt.hash(newPassword, Number(envVars.BCRYPT_SALT_ROUND))

   // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
   user!.save()


}


export const AuthServices = {
  
    getNewAccessToken,
    resetPassword
}