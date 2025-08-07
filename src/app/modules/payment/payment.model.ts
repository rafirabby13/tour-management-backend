import { model, Schema } from "mongoose";
import { IPayment, PAYMENT_STATUS } from "./payment.interface";

const paymentSchema = new Schema<IPayment>({
    booking: {
        type: Schema.Types.ObjectId,
        ref: 'Booking', // References the 'Booking' model
        required: true,
        unique: true // A payment should typically be linked to one unique booking
    },
    transactionId: {
        type: String,
        required: true,
        unique: true, // Transaction IDs are usually unique
        trim: true
    },
    amount: {
        type: Number,
        required: true
    },
    paymentGatewayData: {
        type: Schema.Types.Mixed // Use Mixed type to store flexible data structures
    },
    invoiceUrl: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: Object.values(PAYMENT_STATUS), // Enforces values from the enum
        default: PAYMENT_STATUS.UNPAID,    // Default status for new payments
    }
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps automatically
});

export const Payment = model<IPayment>('Payment', paymentSchema);