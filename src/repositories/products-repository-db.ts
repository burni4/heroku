export type ProductType = {
    id: number
    title: string
}
const products:ProductType[] = [{id : 0,title: 'tomato'},{id : 1,title: 'potato'}];

export const productsRepositoryInMemory = {
    async findProducts(searchString: string | null | undefined): Promise<ProductType[]>{
        if(searchString){
            return products.filter(p=>p.title.indexOf(searchString) > -1)
            } else {
            return products
        }
        },
    async createProduct(title: string): Promise<ProductType>{
            const newProduct = {id: +(new Date()), title};
            products.push(newProduct);
            return newProduct;
        },
    async findProductByID(id: number): Promise<ProductType | undefined> {
        return products.find(pr => pr.id === +id);
    },
    async updateProductByID(id: number, title: string): Promise<boolean>{
        let product = products.find(pr => pr.id === id)

        if (product){
            product.title = title;
            return true;
        }else{
            return false;
        }
    },
    async deleteProductByID(id: number): Promise<boolean>{
        for (let i =  0; i < products.length; i++){
            if(products[i].id === +id){
                products.splice(i, 1);
                return true;
            }
        }
        return false;
    },
}