/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status-codes";
import { Booking } from "../booking/booking.model";
import { Payment } from "./payment.model";
import { PAYMENT_STATUS } from "./payment.interface";
import { BOOKING_STATUS } from "../booking/booking.interface";
import AppError from "../../errorHelpers/AppError";
import { ISSLCommerz } from "../sslCommerz/sslCommerz.interface";
import { sslService } from "../sslCommerz/sslCommerz.service";



const initPayment = async (bookingId: string) => {
    const payment = await Payment.findOne({ booking: bookingId })
    if (!payment) {
        throw new AppError(httpStatus.NOT_FOUND, "you have not found hahahaha")
    }
    const booking = await Booking.findById(payment.booking)

    const userAddress = (booking?.user as any).address
    const userEmail = (booking?.user as any).email
    const userName = (booking?.user as any).name
    const userPhoneNumber = (booking?.user as any).phone


    const sslPayload: ISSLCommerz = {
        address: userAddress,
        email: userEmail,
        name: userName,
        amount: payment.amount,
        phone: userPhoneNumber,
        transactionId: payment.transactionId
    }

    const sslPayment = await sslService.sslPaymentInit(sslPayload)

    return {
        paymentUrl: sslPayment.GatewayPageURL,

    }
};
const successPayment = async (query: Record<string, string>) => {

    // Update Booking Status to COnfirm 
    // Update Payment Status to PAID

    const session = await Booking.startSession()
    session.startTransaction()
    try {
        console.log("query.transactionId....", query.transactionId)

        const updatedPayment = await Payment.findOneAndUpdate({ transactionId: query.transactionId }, {

            status: PAYMENT_STATUS.PAID,



        }, { new: true, runValidators: true, session })
        console.log("updatedPayment....", updatedPayment)

        await Booking
            .findByIdAndUpdate(
                updatedPayment?.booking,
                { status: BOOKING_STATUS.COMPLETE },
                { new: true, runValidators: true, session }
            )


        // console.log(sslPayment)


        await session.commitTransaction()
        session.endSession()


        return {
            success: true,
            message: "payment completed"
        }
    } catch (error: any) {
        await session.abortTransaction()
        session.endSession()
        throw error
    }


};
const failPayment = async (query: Record<string, string>) => {

    // Update Booking Status to FAIL
    // Update Payment Status to FAIL

    // Update Booking Status to COnfirm 
    // Update Payment Status to PAID

    const session = await Booking.startSession()
    session.startTransaction()
    try {
        //     console.log("query.transactionId....", query.transactionId)

        const updatedPayment = await Payment.findOneAndUpdate({ transactionId: query.transactionId }, {

            status: PAYMENT_STATUS.FAILED,



        }, { new: true, runValidators: true, session })
        // console.log("updatedPayment....", updatedPayment)

        await Booking
            .findByIdAndUpdate(
                updatedPayment?.booking,
                { status: BOOKING_STATUS.FAILED },
                { new: true, runValidators: true, session }
            )



        // console.log(sslPayment)


        await session.commitTransaction()
        session.endSession()


        return {
            success: false,
            message: "payment failed"
        }
    } catch (error: any) {
        await session.abortTransaction()
        session.endSession()
        throw error
    }
};
const cancelPayment = async (query: Record<string, string>) => {

    // Update Booking Status to CANCEL
    // Update Payment Status to CANCEL

    const session = await Booking.startSession();
    session.startTransaction()

    try {


        const updatedPayment = await Payment.findOneAndUpdate({ transactionId: query.transactionId }, {
            status: PAYMENT_STATUS.CANCELLED,
        }, { runValidators: true, session: session })

        await Booking
            .findByIdAndUpdate(
                updatedPayment?.booking,
                { status: BOOKING_STATUS.CANCEL },
                { runValidators: true, session }
            )

        await session.commitTransaction(); //transaction
        session.endSession()
        return { success: false, message: "Payment Cancelled" }
    } catch (error) {
        await session.abortTransaction(); // rollback
        session.endSession()
        // throw new AppError(httpStatus.BAD_REQUEST, error) ❌❌
        throw error
    }
};

// const getInvoiceDownloadUrl = async (paymentId: string) => {
//     const payment = await Payment.findById(paymentId)
//         .select("invoiceUrl")

//     if (!payment) {
//         throw new AppError(401, "Payment not found")
//     }

//     if (!payment.invoiceUrl) {
//         throw new AppError(401, "No invoice found")
//     }

//     return payment.invoiceUrl
// };


export const PaymentService = {
    initPayment,
    successPayment,
    failPayment,
    cancelPayment
};