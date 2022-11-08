import bcrypt from 'bcrypt'
import {ObjectId} from "mongodb";
import {usersRepositoryInDB} from "../repositories/users-repository-db";
export const usersService = {
    async createUser(login: string, email: string, password: string): Promise<any>{
        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await this.generateHash(password,passwordSalt)

        const newUser = {
            _id: new ObjectId(),
            userName: login,
            email,
            passwordHash,
            passwordSalt,
            createdAt: new Date()
        }

        return usersRepositoryInDB.createProduct(newUser)
    },

    async generateHash(password: string, salt: string) {
        const hash = await bcrypt.hash(password, salt)
        return hash
    }
}