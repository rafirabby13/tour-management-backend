import dotenv from "dotenv"


dotenv.config()

interface EnvConfig {
    PORT: string,
    DB_URL: string,
    NODE_ENV: "development" | "production",
    JWT_ACCESS_TOKEN: string,
    JWT_ACCESS_EXPIRES: string,
    JWT_REFRESH_TOKEN: string,
    JWT_REFRESH_EXPIRES: string,
    BCRYPT_SALT_ROUND: string,
    SUPER_ADMIN_EMAIL: string,
    SUPER_ADMIN_PASS: string,
    GOOGLE_CLIENT_ID: string,
    GOOGLE_CLIENT_SECRET: string,
    GOOGLE_CALLBACK_URL: string,
    EXPRESS_SESSION_SECRET: string,
    FRONTEND_URL: string,
    SSL: {
        SSL_STORE_ID: string,
        SSL_STORE_PASS: string,
        SSL_PAYMENT_API: string,
        SSL_VALIDATION_API: string,
        SSL_SUCCESS_BACKEND_URL: string,
        SSL_FAIL_BACKEND_URL: string,
        SSL_CANCEL_BACKEND_URL: string,

        SSL_SUCCESS_FRONTEND_URL: string,
        SSL_FAIL_FRONTEND_URL: string,
        SSL_CANCEL_FRONTEND_URL: string
    },
    EMAIL_SENDER: {
        SMTP_USER: string;
        SMTP_PASS: string;
        SMTP_PORT: string;
        SMTP_HOST: string;
        SMTP_FROM: string;
    };
    REDIS_HOST: string;
    REDIS_PORT: string;
    REDIS_USERNAME: string;
    REDIS_PASSWORD: string;

}

const loadEnvVariables = (): EnvConfig => {

    const requiredEnvVariables: string[] = ["PORT", "DB_URL", "NODE_ENV", "JWT_ACCESS_TOKEN", "BCRYPT_SALT_ROUND", "BCRYPT_SALT_ROUND", "SUPER_ADMIN_EMAIL", "SUPER_ADMIN_PASS", "JWT_REFRESH_TOKEN", "JWT_REFRESH_EXPIRES", "GOOGLE_CALLBACK_URL", "GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET", "EXPRESS_SESSION_SECRET", "FRONTEND_URL", "SSL_STORE_ID", "SSL_STORE_PASS", "SSL_PAYMENT_API", "SSL_VALIDATION_API", "SSL_SUCCESS_BACKEND_URL", "SSL_FAIL_BACKEND_URL", "SSL_CANCEL_BACKEND_URL", "SSL_SUCCESS_FRONTEND_URL", "SSL_FAIL_FRONTEND_URL", "SSL_CANCEL_FRONTEND_URL", "REDIS_HOST",
        "REDIS_PORT",
        "REDIS_USERNAME",
        "REDIS_PASSWORD", "SMTP_PASS",
        "SMTP_PORT",
        "SMTP_HOST",
        "SMTP_USER",
        "SMTP_FROM"]
    requiredEnvVariables.forEach(key => {
        if (!process.env[key]) {
            throw new Error(`missing required env variable : ${key}`)
        }
    })

    return {
        PORT: process.env.PORT as string,
        DB_URL: process.env.DB_URL as string,
        NODE_ENV: process.env.NODE_ENV as "development" | "production",
        JWT_ACCESS_TOKEN: process.env.JWT_ACCESS_TOKEN as string,
        JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES as string,
        JWT_REFRESH_TOKEN: process.env.JWT_REFRESH_TOKEN as string,
        JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES as string,
        BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,
        SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
        SUPER_ADMIN_PASS: process.env.SUPER_ADMIN_PASS as string,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
        GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL as string,
        EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET as string,
        FRONTEND_URL: process.env.FRONTEND_URL as string,
        SSL: {
            SSL_STORE_ID: process.env.SSL_STORE_ID as string,
            SSL_STORE_PASS: process.env.SSL_STORE_PASS as string,
            SSL_PAYMENT_API: process.env.SSL_PAYMENT_API as string,
            SSL_VALIDATION_API: process.env.SSL_VALIDATION_API as string,
            SSL_SUCCESS_BACKEND_URL: process.env.SSL_SUCCESS_BACKEND_URL as string,
            SSL_FAIL_BACKEND_URL: process.env.SSL_FAIL_BACKEND_URL as string,
            SSL_CANCEL_BACKEND_URL: process.env.SSL_CANCEL_BACKEND_URL as string,

            SSL_SUCCESS_FRONTEND_URL: process.env.SSL_SUCCESS_FRONTEND_URL as string,
            SSL_FAIL_FRONTEND_URL: process.env.SSL_FAIL_FRONTEND_URL as string,
            SSL_CANCEL_FRONTEND_URL: process.env.SSL_CANCEL_FRONTEND_URL as string,
        },
        EMAIL_SENDER: {
            SMTP_USER: process.env.SMTP_USER as string,
            SMTP_PASS: process.env.SMTP_PASS as string,
            SMTP_PORT: process.env.SMTP_PORT as string,
            SMTP_HOST: process.env.SMTP_HOST as string,
            SMTP_FROM: process.env.SMTP_FROM as string,
        },

        REDIS_HOST: process.env.REDIS_HOST as string,
        REDIS_PORT: process.env.REDIS_PORT as string,
        REDIS_USERNAME: process.env.REDIS_USERNAME as string,
        REDIS_PASSWORD: process.env.REDIS_PASSWORD as string,


    }

}

export const envVars = loadEnvVariables()