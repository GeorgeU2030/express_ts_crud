import mongoose from "mongoose";

export interface UserInput {
    username: string;
    email: string;
    password: string;
    profilePicture: string;
}

export interface UserDocument extends UserInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

const userSchema = new mongoose.Schema(
    {
      username: {
        type: String,
        required: true,
        unique: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      }
    },
    { timestamps: true }
  );
  
const UserNew =  mongoose.model<UserDocument>('UserNew', userSchema);

export default UserNew;