const products = [{id : 0,title: 'tomato'},{id : 1,title: 'potato'}];

export const productsRepository = {
    findProducts(searchString: string | null | undefined){
        if(searchString){
            return products.filter(p=>p.title.indexOf(searchString) > -1)
            } else {
            return products
        }
        },
    createProduct(title: string){
            const newProduct = {id: +(new Date()), title};
            products.push(newProduct);
            return newProduct;
        },
    findProductByID(id: number){
        return products.find(pr => pr.id === +id);
    },
    updateProductByID(id: number, title: string){
        let product = products.find(pr => pr.id === id)

        if (product){
            product.title = title;
            return true;
        }else{
            return false;
        }
    },
    deleteProductByID(id: number){
        for (let i =  0; i < products.length; i++){
            if(products[i].id === +id){
                products.splice(i, 1);
                return true;
            }
        }
        return false;
    },
}