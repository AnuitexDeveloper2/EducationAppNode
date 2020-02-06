import Users, { User } from '../db-models/user'
import { Role } from '../enums/role'
import  bcrypt from "bcryptjs";

async function Check() {
    let result = await Users.find()
    if(result.length == 0) {
        admin.save();
    }
}

 function initAdmin(): User{
    const admin: User = new Users({
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
Check();
export let admin = initAdmin()


