// const validationRequest = 

import z from "zod";
import { IsActive, Role } from "./user.interface";

export const createUserZodSchema = z.object({
    name: z.string({ invalid_type_error: "Name must be string" }).min(2, { message: "Name minimum of 2 characters" }).max(50, { message: "Name max of 50 characters" }),
    email: z.string().email(),
    password: z.string().min(8)
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[@$!%*?&]/, "Password must contain at least one special character (@ $ ! % * ? &)")
        .regex(/\d/, "Password must contain at least one number").optional(),
    phone: z.string().regex(/^(?:\+88|88)?01[3-9]\d{8}$/, "Invalid Bangladeshi phone number").optional(),
    address: z.string().optional(),
})

export const updateUserZodSchema = z.object({
    name: z.string({ invalid_type_error: "Name must be string" }).min(2, { message: "Name minimum of 2 characters" }).max(50, { message: "Name max of 50 characters" }).optional(),
    password: z.string().min(8)
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[@$!%*?&]/, "Password must contain at least one special character (@ $ ! % * ? &)")
        .regex(/\d/, "Password must contain at least one number").optional(),
    phone: z.string().regex(/^(?:\+88|88)?01[3-9]\d{8}$/, "Invalid Bangladeshi phone number").optional(),
    address: z.string().optional(),
    role: z.enum(Object.values(Role) as [string]).optional(),
    isActive: z.enum(Object.values(IsActive) as [string]).optional(),
    isDeleted: z.boolean({ invalid_type_error: "isDeleted must be true or false" }).optional(),
    isVerified: z.boolean({ invalid_type_error: "is Verified must be true or false" }).optional(),
})
