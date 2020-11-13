import { Request, Response, NextFunction } from 'express'
import { User, } from '../entities'


export async function login(req: Request, res: Response, next: NextFunction) {
    const user = await User.findOne(req.body.username)
    if(user){
        if(user.password === req.body.password){
            res.json('found')
        }else{
            res.json('wrong-password')
        }
    }else{
        res.json('not-found')
    }

}
export async function signUp(req: Request, res: Response, next: NextFunction) {
    let user = new User()
    user.id = req.body.username
    user.username = req.body.username
    user.email = req.body.email
    user.password = req.body.password
    user.save()
    res.json('success')

}