import { Role } from "../shared/enums/role";

   export interface User {
        Id: string;
        userName: string;
        email: string;
        firstName: string;
        lastName: string;
        passwordHash: string;
        role: Role;
        removed_at: boolean;
        status: boolean;
    }

    export interface ResetPassword {
        id: string;
        oldPassword: string;
        newPassword: string;
    }

    export interface OAuth {
     name:  String,
     client_id:  String,
     client_secret: String,
     redirect_uri: String,
     grant_types: String,
     scope: String,
    }
   