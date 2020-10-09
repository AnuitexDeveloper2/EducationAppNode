export interface UserModel {
    id: number;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    removed_at: boolean;
    status: boolean;
    passwordHash: string;
    role: number
}

export interface UserModelRequest {
    firstName: string;
    lastName: string;
    email: string;
    id: number
}

export interface ResetPassword {
    id: number;
    oldPassword: string;
    newPassword: string;
}