/* eslint-disable @typescript-eslint/no-explicit-any */
import passport from "passport";
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from "passport-google-oauth20";
import { envVars } from "./env";
import { User } from "../modules/user/user.model";
import { Role } from "../modules/user/user.interface";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs"

passport.use(
    new LocalStrategy({
        usernameField: "email",
        passwordField: "password"
    }, async (email: string, password: string, done) => {
        try {
            const isUserExist = await User.findOne({ email })
            if (!isUserExist) {
                return done(null, false, { message: "user does not exist" })
            }
            const isGoogleAuthenticated = isUserExist.auths.some(provider => provider.provider == "google")

            if (isGoogleAuthenticated) {

                return done(null, false, { message: "you have authenticated through google login, first login with goole then set password" })

            }


            const isPasswordMatched = await bcrypt.compare(password as string, isUserExist.password as string)

            if (!isPasswordMatched) {
                return done(null, false, { message: "password does not match" })
            }

            return done(null, isUserExist)

        } catch (error) {
            console.log(error)
            done(error)
        }

    })
)

passport.use(
    new GoogleStrategy({
        clientID: envVars.GOOGLE_CLIENT_ID,
        clientSecret: envVars.GOOGLE_CLIENT_SECRET,
        callbackURL: envVars.GOOGLE_CALLBACK_URL,

    }, async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
        try {

            const email = profile?.emails?.[0].value
            if (!email) {
                return done(null, false, { message: "no email found" })
            }

            let user = await User.findOne({ email })
            if (!user) {
                user = await User.create({
                    email,
                    name: profile.displayName,
                    picture: profile.photos?.[0].value,
                    role: Role.USER,
                    isVerified: true,
                    auths: [
                        {
                            provider: "google",
                            providerId: profile.id
                        }
                    ]
                })
            }

            return done(null, user)

        } catch (error) {
            console.log("Google Strategy error", error)
            return done(error)

        }
    })
)


passport.serializeUser((user: Express.User, done: (err: any, id?: unknown) => void) => {
    done(null, (user as any)._id)
})

passport.deserializeUser(async (id: unknown, done: any) => {
    try {
        const user = await User.findById(id)
        done(null, user)

    } catch (error) {
        done(error)
    }

})