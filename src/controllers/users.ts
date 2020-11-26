import { Request, Response, NextFunction } from 'express'
import { User, } from '../entities'


export async function login(req: Request, res: Response, next: NextFunction) {
    let user = await User.createQueryBuilder('user')
        .where("user.username = :username AND user.password = :password",{
            username: req.body.username,
            password: req.body.password
        })
        .getOne()
    
    if(user){
        res.json({
            message: 'found',
            user: user
        })
    }else{
        res.json('not-found')
    }

}
export async function signUp(req: Request, res: Response, next: NextFunction) {
    try{
        let ID = '_' + Math.random().toString(36).substr(2, 9);
    
        console.log(ID)
        let user = new User()
        user.id = ID
        user.username = req.body.username
        user.email = req.body.email
        user.password = req.body.password
        await user.save()
        res.json(user)
    }
    catch(err){
        res.json({message: 'already exsists'})
    }


// let users = await User.query("DROP TABLE[user]")
// console.log(users)

}
export async function getUser(req: Request, res: Response, next: NextFunction) {
    let user = await User.findOneOrFail(req.body.id)
    res.json({
        user: user
    })


}
export async function updateUser(req: Request, res: Response, next: NextFunction) {
    let user = await User.findOneOrFail(req.body.id)
    if(user.password !== req.body.password){
        res.json('incorrect password')
    }else if( req.body.newPassword !== req.body.confirmNewPassword){
        res.json('passwords do not match')
    }else{
        user.username = req.body.username
        user.password = req.body.newPassword
        user.email = req.body.email
        user.save()
        res.json({
            message: 'success',
            user: user
        })
    }


}