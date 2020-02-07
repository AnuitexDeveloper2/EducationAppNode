import Users from '../db-models/user'
import { Role } from '../enums/role'
import bcrypt from "bcryptjs";
import userModel from '../db-models/user';
import mongoose, { model } from 'mongoose';
import authorModel from '../db-models/author';
import Authors from '../db-models/author';


export class Init {

    admin: Users;
    author: Authors; 
    private  checkModel = userModel;

   constructor () {
       this.admin = new Users();
       this.author = new Authors()
   }
    
   public async Check() {
       this.initAdmin();
       this.initAuthor()
    }
    
     private async initAdmin(): Promise<userModel>{

        let result = await userModel.find();
        if (result.length == 0) {
            
            
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
            admin.save();
            return admin;
        }
        return this.admin
    }

    private async initAuthor(): Promise<authorModel>  {


        let result = await authorModel.find();
        if (result.length == 0) {
            const author: authorModel = new Authors({
                name: ' Terry Pratchett'
            })
            author.save();
            return author;
                }
        return this.author;
    }
}



