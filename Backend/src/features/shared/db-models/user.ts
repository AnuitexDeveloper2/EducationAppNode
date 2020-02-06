import mongoose,{model,Document} from 'mongoose';
import { Role } from '../enums/role';
import { ObjectID } from 'mongodb';

const schema = mongoose.Schema;

export const usersSchema = new schema({
    userName: { type: String, unique: true, required: true },
    email: {type: String, unique: true, required: true},
    avatar: {type: String},
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    passwordHash: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    role: { type: Role, required: true, default: Role.User }
});


const userModel = model<User>('User', usersSchema);
export default userModel;

export interface User extends Document {
    _id: ObjectID | string,
    userName: string,
    email: string,
    firstName: string,
    lastName: string,
    passwordHash: string
}
