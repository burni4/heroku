import {Request, Response, Router} from "express";
import {usersService} from "../domain/users-service";

export const authRouter = Router({})
authRouter.post('/',
    async (req: Request, res: Response) => {

        const checkResult = await usersService.checkCredentials(req.body.loginOrEmail, req.body.password)

        res.status(201).send(checkResult);

    })

