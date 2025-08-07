/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextFunction, Request, Response } from "express"
import { envVars } from "../config/env"
import AppError from "../errorHelpers/AppError"
import { handleDuplicateError } from "../helpers/handleDuplicateError"
import { handleCastError } from "../helpers/handleCastError"
import { handleZodError } from "../helpers/handleZodError"
import { handleValidationError } from "../helpers/handleValidationError"










export const globalErrorHandler =
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (error: any, req: Request, res: Response, next: NextFunction) => {

       


        let statusCode = 500
        let errorSources: any = []

        let message = `Something Went Wrong:`
        if (error.code === 11000) {
            const simplyFiedError = handleDuplicateError(error)
            statusCode = simplyFiedError.statusCode
            message = simplyFiedError.message
        }
        else if (error.name == "CastError") {
            const simplyFiedError = handleCastError(error)
            statusCode = simplyFiedError.statusCode
            message = simplyFiedError.message
        }
        else if (error.name === 'ZodError') {
            const simplyFiedError = handleZodError(error)
            errorSources = simplyFiedError.errorSources
            statusCode = simplyFiedError.statusCode

            message = simplyFiedError.message

        }
        else if (error.name === 'ValidationError') {
            const simplyFiedError = handleValidationError(error)
            errorSources = simplyFiedError.errorSources
            statusCode = simplyFiedError.statusCode

            message = simplyFiedError.message

        }
        if (error instanceof AppError) {
            statusCode = error.statusCode
            message = error.message
        }
        else if (error instanceof Error) {
            statusCode = 500;
            // eslint-disable-next-line no-unused-labels, @typescript-eslint/no-unused-expressions
            message: error.message;

        }
        res.status(statusCode).json({
            success: false,
            message,
            errorSources,
            error: envVars.NODE_ENV === "development" ? error : null,
            stack: envVars.NODE_ENV == 'development' ? error.stack : null
        })
    }
