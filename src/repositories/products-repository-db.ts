import {client} from "./db";

export type ProductType = {
    id: number
    title: string
}

export const productsRepositoryInMemory = {
    async findProducts(searchString: string | null | undefined): Promise<ProductType[]>{
        if(searchString){
            return client.db("shop").collection<ProductType>("products").find({title: {$regex: searchString}}).toArray()
            } else {
            return client.db("shop").collection<ProductType>("products").find({}).toArray()
        }
        },
    async createProduct(title: string): Promise<ProductType>{
            const newProduct = {id: +(new Date()), title};
            const result = await client.db("shop").collection<ProductType>("products").insertOne(newProduct)
            return newProduct;
        },
    async findProductByID(id: number): Promise<ProductType | null> {
        return await client.db("shop").collection<ProductType>("products").findOne({id: id});
    },
    async updateProductByID(id: number, title: string): Promise<boolean>{

        const result = await client.db("shop").collection<ProductType>("products").updateOne({id: id}, {$set: {title: title}})

        return result.matchedCount === 1

    },
    async deleteProductByID(id: number): Promise<boolean>{
        const result = await client.db("shop").collection<ProductType>("products").deleteOne({id: id})
        return result.deletedCount === 1;
    },
}