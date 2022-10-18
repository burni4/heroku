import {Request, Response, Router} from "express";
import {productsRepository} from "../repositories/products-repository";
import {body, validationResult} from "express-validator";

export  const productsRouter = Router({});

const titleValidation =  body('title').isLength({min: 1, max: 300}).withMessage('Title length should be form 1 to 300 symbols')

productsRouter.post('/',
    titleValidation
    ,(req: Request, res: Response) => {
    if(!req.body.title.trim()){
        res.status(400).send({message: 'title is require'})
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const newProduct = productsRepository.createProduct(req.body.title)

    res.status(201).send(newProduct);

})


productsRouter.get('/', (req: Request, res: Response) => {

    const foundProducts = productsRepository.findProducts(req.query.title?.toString())

    res.send(foundProducts);

})

productsRouter.get('/:id', (req: Request, res: Response) => {

    let product = productsRepository.findProductByID(+req.params.id)
    if (product){
        res.send(product);
    }else{
        res.send(404);
    }

})

productsRouter.put('/:id',
    titleValidation
    ,(req: Request, res: Response) => {

    const isUpdated = productsRepository.updateProductByID(+req.params.id, req.body.title)

    if (isUpdated){
        const product  = productsRepository.findProducts(req.query.title?.toString());
        res.send(product);
    }else{
        res.send(404);
    }

})

productsRouter.delete('/:id', (req: Request, res: Response) => {

    const isDeleted = productsRepository.deleteProductByID(+req.params.id)

    if (isDeleted){
        res.send(204);
    }else{
        res.send(404);
    }
})