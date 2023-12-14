import { registerAs } from "@nestjs/config";
import { JwtModuleOptions } from "@nestjs/jwt";


export  default registerAs('security', (): JwtModuleOptions => {
    const secret = process.env.SECRET

    const expiresIn = '1d'

    return {
        secret,
        signOptions: {
            expiresIn: expiresIn,
        }
    }
})