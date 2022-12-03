
export type UserDBType = {
    _id: string
    login: string
}

export const usersRepositoryInDB = {

    async createProduct(newUser: any): Promise<any>{
            return 1
    },
    async deleteUser(userID: string): Promise<any>{
        return 1
    },
    async findByLoginOrEmail(LoginOrEmail: string): Promise<any>{
        //const user = await  usersCollections.findOne({$or: [{email: LoginOrEmail}, {userName: LoginOrEmail}]})
        return 1
    }
}