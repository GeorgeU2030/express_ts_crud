import User from "../models/user.model";
import { Request, Response, NextFunction } from "express";
import bcryptjs from 'bcryptjs';
import userService from "../services/user.service";
 

class UserController {

    public async createUser(req:Request, res:Response, next:NextFunction) {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    try {
      await newUser.save();
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      next(error);
    } 
}

    public async getUsers(req:Request, res:Response, next:NextFunction) {
    try {
      const users = await userService.findAll(res, req, next);
      res.status(200).json(users);      
    } catch (error) {
      next(error);
    }
    }

    public async updateUser(req:Request, res:Response, next:NextFunction) {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      { new: true }
    );
    if (updatedUser) {
      const { password, ...rest } = updatedUser;
      res.status(200).json(rest);
    } else {
      // Handle the case when updatedUser is null
      // For example, return an error response
      res.status(404).json({ message: 'User not found' });
    }
  }

  // POST USERNEW
  public async createUser2(req:Request, res:Response) {
    try{
      
      const userExists = await userService.findByEmail(req.body.email);
      if (!userExists)
      {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
      const user = req.body;
      const newUser = await userService.addUser(user);
      res.status(201).json(newUser);
      // ANOTHER FORM
      // const user:UserDocument = await UserService.addUser(req.body as UserInput);
      } else {
      res.status(400).json({message: 'User already exists'})
      }
    }
    catch(error){
      return res.status(500).json({message: error});
    }
  }

  // GET USERNEW
  public async getUsers2(req:Request, res:Response) {
      try{
          const users = await userService.findAll2();
          res.status(200).json(users);
      }catch(error){
        return res.status(500).json({message: error});
      }
  }

  // PUT USERNEW

  public async updateUser2(req:Request, res:Response) {
      try{

        const userExists = await userService.findByEmail(req.body.email);

        if(userExists){
          const updatedUser = await userService.updateUser(req.params.id, req.body);
          res.status(200).json(updatedUser)
        }
        else {
          res.status(400).json({message: 'User not found'})
        }

      }catch(error){
        return res.status(500).json({message: error});
      }
  }

  // DELETE USERNEW
  public async deleteUser2(req:Request, res:Response) {
      try{
          const deletedUser = await userService.deleteUser(req.params.id);
          res.status(200).json({message: 'User deleted successfully'});
      }catch(error){
        return res.status(500).json({message: error});
      }
  }
    
};

export default new UserController();