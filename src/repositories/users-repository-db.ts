
export const usersRepositoryInDB = {

    async createProduct(newUser: any): Promise<any>{
            return 1
    },
    async findByLoginOrEmail(LoginOrEmail: string): Promise<any>{
        //const user = await  usersCollections.findOne({$or: [{email: LoginOrEmail}, {userName: LoginOrEmail}]})
        return 1
    }
}