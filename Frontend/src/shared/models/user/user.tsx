export interface UserModel {
    id: string;
    userName: string;
    firstName:string;
    lastName: string;
    email: string;
    removed_at: boolean;
    status: boolean;
    passwordHash: string;
    role: string
}