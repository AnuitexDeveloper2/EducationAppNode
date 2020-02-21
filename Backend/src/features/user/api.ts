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
    }

    export interface ResetPassword {
        _id: string;
        oldPassword: string;
        newPassword: string;
    }
   