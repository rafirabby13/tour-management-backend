import axios from "axios"
import { envVars } from "../../config/env"
import { ISSLCommerz } from "./sslCommerz.interface"
import AppError from "../../errorHelpers/AppError"
import httpStatus from "http-status-codes"
const sslPaymentInit = async (payload: ISSLCommerz) => {
   try {
     const data = {
        store_id: envVars.SSL.SSL_STORE_ID,
        store_passwd: envVars.SSL.SSL_STORE_PASS,
        total_amount: payload.amount,
        currency: "BDT",
        tran_id: payload.transactionId,
        success_url: `${envVars.SSL.SSL_SUCCESS_BACKEND_URL}?transactionId=${payload.transactionId}&amount=${payload.amount}&status=success`,
        fail_url: `${envVars.SSL.SSL_FAIL_BACKEND_URL}?transactionId=${payload.transactionId}&amount=${payload.amount}&status=fail`,
        cancel_url: `${envVars.SSL.SSL_CANCEL_BACKEND_URL}?transactionId=${payload.transactionId}&amount=${payload.amount}&status=cancel`,
        cus_name: payload.name,
        cus_email: payload.email,
        cus_add1: payload.address,
        cus_add2: "n/a",
        cus_city: "Dhaka",
        cus_state: "Dhaka",
        cus_postcode: "1000",
        cus_country: "Bangladesh",
        cus_phone: payload.phone,
        cus_fax: "n/a",
        ship_name: "n/a",
        ship_add1: "n/a",
        ship_add2: "n/a",
        ship_city: "n/a",
        ship_state: "n/a",
        ship_postcode: 1000,
        ship_country: "Bangladesh",
        multi_card_name: " mastercard, visacard, amexcard",
        value_a: " ref001_A",
        value_b: "ref002_B",
        value_c: "ref003_C",
        value_d: "ref004_D"
    }

    const response = await axios({
        method: "POST",
        url: envVars.SSL.SSL_PAYMENT_API,
        data: data,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })

    return response.data
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   } catch (error: any) {
    console.log("payment error occured", error)
    throw new AppError(httpStatus.BAD_REQUEST, error.message)
   }
}

export const sslService = {
    sslPaymentInit
}