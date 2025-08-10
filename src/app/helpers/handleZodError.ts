import { TErrorSources, TGenericError } from "../interfaces/errors.types"

/* eslint-disable @typescript-eslint/no-explicit-any */
export const handleZodError = (error: any): TGenericError => {
    const errorSources: TErrorSources[] = []

    const errors = error.issues

    errors.forEach((error: any) => errorSources.push({
        path: error.path,
        message: error.message
    }))

    return {

        statusCode: 400,
        message: "Zod Error",
        errorSources

    }

}