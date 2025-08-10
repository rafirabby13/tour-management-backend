/* eslint-disable no-console */
import { Server } from 'http'
import mongoose from 'mongoose';
import app from './app';
import { envVars } from './app/config/env';
import { seedSuperAdmin } from './app/utils/seedSuperAdmin';
import { connecRedis } from './app/config/redis.config';

let server: Server;

const startServer = async () => {
    try {
        await mongoose.connect(envVars.DB_URL)

        console.log("connected to DB")
        server = app.listen(envVars.PORT, () => {
            console.log("server is listening on 5000")
        })
    } catch (error) {
        console.log(error)
    }

}

(async () => {
    await connecRedis()
    await startServer();
    await seedSuperAdmin();
})()


process.on("SIGTERM", () => {
    console.log("SIGTERM signal recieved...server shutting down")
    if (server) {
        server.close(() => {

            process.exit(1)
        })
    }
    process.exit(1)
})

process.on("unhandledRejection", (error) => {
    console.log("Unhandled Rejection detected... server shutting down", error)
    if (server) {
        server.close(() => {

            process.exit(1)
        })
    }
    process.exit(1)
})

process.on("uncaughtException", (error) => {
    console.log("Unhandled Exception detected... server shutting down", error)
    if (server) {
        server.close(() => {

            process.exit(1)
        })
    }
    process.exit(1)
})


// unhandledRejection error
// Promise.reject(new Error("I forgot to catch this error"))

// uncaughtException error
// throw new Error("I forgot to handle  this local error")


