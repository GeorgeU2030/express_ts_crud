import User from "../models/user.model";
import { Request, Response, NextFunction } from "express";
import UserNew, { UserInput, UserDocument } from "../models/usernew.models";
import bcryptjs from 'bcryptjs';

class UserService {

    public async findAll (res:Response, req:Request, next:NextFunction) {
        const users = await User.find();
        return users;
    }

    public async findAll2 (): Promise<UserDocument[]> {
        try{
            const users = await UserNew.find();
            return users;       
        }
        catch(error){
            throw new Error((error as Error).message);
        }
    }

 
    public async addUser (user: UserInput): Promise<UserDocument> {
        try{

            const newUser = new UserNew(user);
            const savedUser = await newUser.save();
            // const user = await UserNew.create(user)
            return savedUser;
        }
        catch(error){
            console.log(error)
            throw new Error((error as Error).message);
        }
    }

    public async updateUser (id: string, user: UserInput): Promise<UserDocument | null> {
        try{
            const updatedUser = await UserNew.findByIdAndUpdate(id, user, {new: true});
            return updatedUser;
        }catch(error){
            throw new Error((error as Error).message);
        }
    }

    public async deleteUser (id: string): Promise<UserDocument | null> {
        try{
            const deletedUser = await UserNew.findByIdAndDelete(id);
            return deletedUser;
        }catch(error){
            throw new Error((error as Error).message);
        }
    }

    //findbyemail
    public async findByEmail (email: string): Promise<UserDocument | null> {
        try{
            const user = await UserNew.findOne({email});
            return user;
        }catch(error){
            throw new Error((error as Error).message);
        }
    }
}

export default new UserService();