import Users from '../db-models/user'
import { Role } from '../enums/role'
import  bcrypt from "bcryptjs";
import userModel from '../db-models/user';
import mongoose from 'mongoose';

export class Init {

    admin:Users;
    private  checkModel = userModel;

   constructor () {
       this.admin = new Users();
   }
    
   public async Check(model: mongoose.Model<mongoose.Document>) {
        let result = await model.find()
        if(result.length == 0) {
            this.admin = this.initAdmin();
            this.admin.save();
        }
    }
    
    private initAdmin(): userModel{

        const admin: userModel = new Users({
            userName: 'Morgenshtern88',
            firstName: 'Vladimir',
            lastName: 'Goncharuk',
            email: 'morgenshtern1988@gmail.com',
            role: Role.Admin,
            passwordHash: '25012005'
        })
        
        var salt = bcrypt.genSaltSync(10);
        admin.passwordHash = bcrypt.hashSync('25012005',salt);
        return  admin
    }
}



