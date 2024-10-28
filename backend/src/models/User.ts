import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    image?: string;
}

const userSchema: Schema<IUser> = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "",
    }
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;