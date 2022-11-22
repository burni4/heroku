import jwt from 'jsonwebtoken'
import {ObjectId} from "mongodb";
import {UserDBType} from "../repositories/users-repository-db";

const JWT_SECRET = '123'

export const jwtService = {
    async createJWT(user: any){
        const token = jwt.sign({userId: user._id}, JWT_SECRET, {expiresIn: '1h'})
        return {
            accessToken: token
        }
    },
    async getUserIdByToken(token: string){
        try{
            const result: any = jwt.verify(token, '')
            return new ObjectId(result.userId)
        }catch(error){
            return null
        }
    }
}

// JWT_SECRET: process.env.JWT_SECRET || "123"
