import {productsRepositoryInDB} from "../repositories/products-repository-db";
import {ProductType} from "../repositories/db";

export const productsService = {
    async findProducts(searchString: string | null | undefined): Promise<ProductType[]>{
        return productsRepositoryInDB.findProducts(searchString)
    },
    async findProductByID(id: number): Promise<ProductType | null> {
        return productsRepositoryInDB.findProductByID(id)
    },
    async createProduct(title: string): Promise<ProductType>{
        const newProduct = {id: +(new Date()), title};
        const  createdProduct: ProductType = await productsRepositoryInDB.createProduct(newProduct)
        return createdProduct;
    },
    async updateProductByID(id: number, title: string): Promise<boolean>{
        return await productsRepositoryInDB.updateProductByID(id, title)
    },
    async deleteProductByID(id: number): Promise<boolean>{
        return productsRepositoryInDB.deleteProductByID(id)
    },
}