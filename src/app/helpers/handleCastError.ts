import mongoose from "mongoose"
import { TGenericError } from "../interfaces/errors.types"

export const handleCastError = (error: mongoose.Error.CastError): TGenericError => {
    console.log(error.message)
    return {

        statusCode: 400,
        message: " Invalid Mongdb obj, please provide a valid id "

    }

}