export interface UserModel {
    id: string;
    userName: string;
    firstName:string;
    lastName: string;
    email: string;
    removed_at: boolean;
    status: boolean;
    passwordHash: string;
    role: number
}

export interface UserModelRequest {
    firstName:string;
    lastName: string;
    email: string;
    id:string
}

export interface ResetPassword {
    id: string;
    oldPassword: string;
    newPassword: string;
}