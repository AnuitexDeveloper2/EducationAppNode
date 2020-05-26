import { UserModel } from "./user/user";
import { AuthorModel } from "./printingEdition/printingEditionModel";

export interface ResponseModel {
    result: boolean;
    error: string
}

export interface LogInResponseModel {
    result : boolean
    error: string
    AccessToken: string
    RefreshToken: string
    user: UserModel
}

export interface UserResponseModel {
    result: boolean
    error: string
    user: UserModel
}
