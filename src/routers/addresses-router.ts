import {Request, Response, Router} from "express";
import {addressesRepository} from "../repositories/addresses-repository";

export  const addressesRouter = Router({});



addressesRouter.get('/:id', (req: Request, res: Response) => {

    const foundAddress = addressesRepository.findAddress(req.query.title?.toString())

    res.send(foundAddress);
})
