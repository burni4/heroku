import {productsCollection, ProductType} from "./db";

export const productsRepositoryInDB = {
    async findProducts(searchString: string | null | undefined): Promise<ProductType[]>{
        let filter: any = {};
        if (searchString) {
            filter.title = {$regex: searchString}
        }
        return productsCollection.find(filter).toArray()
    },
    async findProductByID(id: number): Promise<ProductType | null> {
        return await productsCollection.findOne({id: id});
    },
    async createProduct(newProduct: ProductType): Promise<ProductType>{
            const result = await productsCollection.insertOne(newProduct)
            return newProduct
    },
    async updateProductByID(id: number, title: string): Promise<boolean>{

        const result = await productsCollection.updateOne({id: id}, {$set: {title: title}})

        return result.matchedCount === 1

    },
    async deleteProductByID(id: number): Promise<boolean>{
        const result = await productsCollection.deleteOne({id: id})
        return result.deletedCount === 1;
    },
}