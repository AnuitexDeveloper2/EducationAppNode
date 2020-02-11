import userModel from "../db-models/user";
import jwt from 'jsonwebtoken';


export const generateTokens = (userModel: userModel) => {
    
    const user = {
        "role": userModel.role,
        "id": userModel._id
    }

    const secret: any = process.env.secret;
    const accessTokenLife: any = process.env.accessTokenLife;
    const accessToken = jwt.sign(user, secret,  {expiresIn: accessTokenLife});

   const refreshTokenSecret : any = process.env.refreshTokenSecret;
   const refreshTokenLife : any = process.env.refreshTokenLife;
   const refreshToken = jwt.sign(user, refreshTokenSecret, {expiresIn: refreshTokenLife})

  
   const respons = {
    "status": "Logged in",
    "token": accessToken,
    "refreshToken": refreshToken,
}
    return respons;
}