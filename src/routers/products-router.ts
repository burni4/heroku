import {Request, Response, Router} from "express";
import {body} from "express-validator";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {productsService} from "../domain/products-service";
import {authMiddleware} from "../middlewares/auth-middleware";

export  const productsRouter = Router({});

const titleValidation =  body('title').isLength({min: 1, max: 300}).withMessage('Title length should be form 1 to 300 symbols')

productsRouter.post('/',
    authMiddleware,
    titleValidation,
    inputValidationMiddleware,
    async (req: Request, res: Response) => {

        // req.user._id
        if (!req.body.title.trim()) {
            res.status(400).send({message: 'title is require'})
        }

        const newProduct = await productsService.createProduct(req.body.title)

        res.status(201).send(newProduct);

    })


productsRouter.get('/', async (req: Request, res: Response) => {

    const foundProducts = await productsService.findProducts(req.query.title?.toString())

    res.send(foundProducts);

})

productsRouter.get('/:id', async (req: Request, res: Response) => {

    let product = await productsService.findProductByID(+req.params.id)
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

        const isUpdated = await productsService.updateProductByID(+req.params.id, req.body.title)

        if (isUpdated) {
            const product = await productsService.findProductByID(+req.params.id);
            res.send(product);
        } else {
            res.send(404);
        }

    })

productsRouter.delete('/:id', async (req: Request, res: Response) => {

    const isDeleted = await productsService.deleteProductByID(+req.params.id)

    if (isDeleted) {
        res.send(204);
    } else {
        res.send(404);
    }
})