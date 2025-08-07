import express, {  Request, Response } from "express"
import { router } from "./app/routes"
import { globalErrorHandler } from "./app/middlewares/globarErrorHandler"
import "./app/config/passport"
import notFound from "./app/middlewares/notFound"
import cookieParser from "cookie-parser"
import cors from 'cors'
import passport from "passport"
import expressSession from "express-session" 
const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(expressSession({
    secret: "your secret",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use('/api/v1', router)
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome to tour management system"
    })

})

app.use(globalErrorHandler)

app.use(notFound)

export default app;