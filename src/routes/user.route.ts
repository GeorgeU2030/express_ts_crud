import express, { NextFunction, Request, Response } from 'express';
import userController from '../controllers/user.controller';
import {Express} from 'express';


const routes = (app:Express) =>{
    app.post('/newuser', userController.createUser);
    app.get('/getusers', userController.getUsers);
    app.post('/adduser', userController.createUser2);
    app.get('/getusers2', userController.getUsers2);
    app.put('/updateuser2/:id', userController.updateUser2);
    app.delete('/deleteuser2/:id', userController.deleteUser2);
}

export default routes;