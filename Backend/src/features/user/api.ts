import { Role } from "../shared/enums/role";

   export interface User  {
        userName: string,
        email: string,
        firstName: string,
        lastName: string,
        passwordHash: string
        role: Role
    }
   