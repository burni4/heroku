import {Router} from "express";

export  const addressesRouter = Router({});

const addresses = [{id : 0, title: 'Minks'},{id:1, title: 'Kiev'}]

export const addressesRepository = {
    findAddress(searchString: string | null | undefined){
        if(searchString){
        return addresses.filter(p=>p.title.indexOf(searchString) > -1);
    } else { return addresses }
    }
}