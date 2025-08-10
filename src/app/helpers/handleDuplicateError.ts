/* eslint-disable @typescript-eslint/no-explicit-any */
import { TGenericError } from "../interfaces/errors.types"

export const handleDuplicateError = (error: any): TGenericError => {
    const matchedArray = error.message.match(/"([^"]*)"/)
    return {

        statusCode: 400,
        message: `duplicate error Occured ${matchedArray[1]}`

    }

}