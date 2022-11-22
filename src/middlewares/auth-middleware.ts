import {Request,Response,NextFunction} from "express";
import {jwtService} from "../application/jwtService";
import {usersService} from "../domain/users-service";


export  const authMiddleware = async (req: Request, res: Response, next: NextFunction)  => {

    if(!req.headers.authorization){
        res.send(401)
        return
    }
    const token = req.headers.authorization.split(' ')[1]

    const userId = await jwtService.getUserIdByToken(token)
    if(userId){
        req.body.user = await usersService.findUserByID(userId)
        next()
        return
    }
    res.send(401)
}