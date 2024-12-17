import {z} from "zod";

export const profileSchema = z.object({
    // TODO trim fields
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    address: z.string().optional(),
    bank_account: z.string().optional(), // add iban validation (npm i iban) or regex
    balance: z.number().nonnegative("Balance can't be negative").optional()
})

export const updateProfileSchema = z.object({
    name: z.string().min(1, "Name is required").optional(),
    email: z.string().email("Invalid email format").optional(),
    password: z.string().min(8, "Password must be at least 8 characters").optional(),
    address: z.string().optional(),
    bank_account: z.string().optional(), // add iban validation (npm i iban) or regex
    balance: z.number().nonnegative("Balance can't be negative").optional()
})