/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose"
import { TErrorSources, TGenericError } from "../interfaces/errors.types"

export const handleValidationError = (error: mongoose.Error.ValidationError): TGenericError => {


    const errorSources: TErrorSources[] = []

    const errors = Object.values(error.errors)

    errors.forEach((error: any) => errorSources.push({
        path: error.path,
        message: error.message
    }))
    return {

        statusCode: 400,
        message: `Validation error occured : ${error.message}`,
        errorSources

    }

}