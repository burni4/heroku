import {Request, Response, Router} from "express";
import {productsRepositoryInMemory} from "../repositories/products-repository-db";
import {body} from "express-validator";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";

export  const productsRouter = Router({});

const titleValidation =  body('title').isLength({min: 1, max: 300}).withMessage('Title length should be form 1 to 300 symbols')

productsRouter.post('/',
    titleValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {
        if (!req.body.title.trim()) {
            res.status(400).send({message: 'title is require'})
        }

        const newProduct = await productsRepositoryInMemory.createProduct(req.body.title)

        res.status(201).send(newProduct);

    })


productsRouter.get('/', async (req: Request, res: Response) => {

    const foundProducts = await productsRepositoryInMemory.findProducts(req.query.title?.toString())

    res.send(foundProducts);

})

productsRouter.get('/:id', async (req: Request, res: Response) => {

    let product = await productsRepositoryInMemory.findProductByID(+req.params.id)
    if (product) {
        res.send(product);
    } else {
        res.send(404);
    }

})

productsRouter.put('/:id',
    titleValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {

        const isUpdated = await productsRepositoryInMemory.updateProductByID(+req.params.id, req.body.title)

        if (isUpdated) {
            const product = await productsRepositoryInMemory.findProducts(req.query.title?.toString());
            res.send(product);
        } else {
            res.send(404);
        }

    })

productsRouter.delete('/:id', async (req: Request, res: Response) => {

    const isDeleted = await productsRepositoryInMemory.deleteProductByID(+req.params.id)

    if (isDeleted) {
        res.send(204);
    } else {
        res.send(404);
    }
})