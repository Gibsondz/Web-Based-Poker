"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getUser = exports.signUp = exports.login = void 0;
const entities_1 = require("../entities");
async function login(req, res, next) {
    let user = await entities_1.User.createQueryBuilder('user')
        .where("user.username = :username AND user.password = :password", {
        username: req.body.username,
        password: req.body.password
    })
        .getOne();
    if (user) {
        res.json({
            message: 'found',
            user: user
        });
    }
    else {
        res.json('not-found');
    }
}
exports.login = login;
async function signUp(req, res, next) {
    let ID = '_' + Math.random().toString(36).substr(2, 9);
    console.log(ID);
    let user = new entities_1.User();
    user.id = ID;
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save();
    res.json(user);
    // let users = await User.query("DROP TABLE[user]")
    // console.log(users)
}
exports.signUp = signUp;
async function getUser(req, res, next) {
    let user = await entities_1.User.findOneOrFail(req.body.id);
    res.json({
        user: user
    });
}
exports.getUser = getUser;
async function updateUser(req, res, next) {
    let user = await entities_1.User.findOneOrFail(req.body.id);
    if (user.password !== req.body.password) {
        res.json('incorrect password');
    }
    else if (req.body.newPassword !== req.body.confirmNewPassword) {
        res.json('passwords do not match');
    }
    else {
        user.username = req.body.username;
        user.password = req.body.newPassword;
        user.email = req.body.email;
        user.save();
        res.json({
            message: 'success',
            user: user
        });
    }
}
exports.updateUser = updateUser;
