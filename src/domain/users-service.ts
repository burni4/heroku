import bcrypt from 'bcrypt'
import {ObjectId} from "mongodb";
import {usersRepositoryInDB} from "../repositories/users-repository-db";
import {v4 as uuidv4} from 'uuid';
import add from 'date-fns/add'

export const usersService = {
    async findUserByID(userID: string | null | ObjectId) {
        return {}
    },
    async createUser(login: string, email: string, password: string): Promise<any> {
        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await this.generateHash(password, passwordSalt)

        const newUser = {
            _id: new ObjectId(),
            accountData: {
                userName: login,
                email,
                passwordHash,
                passwordSalt,
                createdAt: new Date()
            },
            emailConfirmation: {
                confirmationCode: uuidv4(),
                expirationDate: add(new Date(), {hours: 1, minutes: 3}),
                isConfirmed: false
            }
        }

        return usersRepositoryInDB.createProduct(newUser)
    },

    async checkCredentials(loginOrEmail: string, password: string) {
        const user = await usersRepositoryInDB.findByLoginOrEmail(loginOrEmail)
        if(!user) return false

        const passwordHash = await this.generateHash(password, user.passwordSalt)

        if(user.passwordHash !== passwordHash){
            return false
        }
        return true
    },
    async generateHash(password: string, salt: string) {
        const hash = await bcrypt.hash(password, salt)
        return hash
    }
}