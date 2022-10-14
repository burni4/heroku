import {Request, Response, Router} from "express";

export  const addressesRouter = Router({});

const addresses = [{id : 0, value: 'Minks'},{id:1, title: 'Kiev'}]

addressesRouter.get('/:id', (req: Request, res: Response) => {

    let address = addresses.find(ad => ad.id === +req.params.id)
    if (address){
        res.send(address);
    }else{
        res.send(404);
    }
})
