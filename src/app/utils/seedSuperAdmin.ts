import { envVars } from "../config/env"
import { IAuthProvider, Role } from "../modules/user/user.interface"
import { User } from "../modules/user/user.model"
import bcrypt from "bcryptjs"

export const seedSuperAdmin = async () => {
try {
    const isSuperAdminExist = await User.findOne({email: envVars.SUPER_ADMIN_EMAIL})
    if (isSuperAdminExist) {
        console.log("super admin already exist")
        return
    }
        console.log("banarehe")


const hashedPassword = await bcrypt.hash(envVars.SUPER_ADMIN_PASS, parseInt(envVars.BCRYPT_SALT_ROUND))

const authProvider: IAuthProvider = {
    provider: "credentials",
    providerId: envVars.SUPER_ADMIN_EMAIL
}
    const payload ={
        name: "Super Admin",
        role: Role.SUPER_ADMIN,
        email: envVars.SUPER_ADMIN_EMAIL,
        password: hashedPassword,
        isVerified: true,
        phone: "01750296501",
        address: "Dhaka",
        auths: [authProvider]

    }
    const superAdmin = await User.create(payload)
    console.log("super admin created succesfully",superAdmin)
    
} catch (error) {
    console.log(error)
}
}