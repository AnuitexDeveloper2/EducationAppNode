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
        confirmedEmail: boolean;
    }

    export interface ResetPassword {
        id: string;
        oldPassword: string;
        newPassword: string;
    }

    export interface OAuthModel {
        user_Id:  String,
    }
   