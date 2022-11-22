import {Request, Response, Router} from "express";
import {usersService} from "../domain/users-service";
import {jwtService} from "../application/jwtService";

export const authRouter = Router({})
authRouter.post('/',
    async (req: Request, res: Response) => {

        const user = await usersService.checkCredentials(req.body.loginOrEmail, req.body.password)

        if(user){
            const token = await jwtService.createJWT(user)
            res.status(201).send(token)
        }else{
            res.sendStatus(401)
        }

    })

