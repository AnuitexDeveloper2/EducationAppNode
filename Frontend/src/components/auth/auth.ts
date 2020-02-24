import {Action, Reducer} from 'redux';

export interface AuthState {
    user: UserModel,
    redirect: Boolean
}

export interface UserModel {
    _id: string,
    userNane: string,
    firstName: string,
    lastName: string,
    email: string,
    avatar: string
}

interface Register {
    type: 'SIGN_UP';
    user: UserModel;
    redirect: any;
}