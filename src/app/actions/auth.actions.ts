import { Action } from '@ngrx/store';

export enum AuthActionTypes {
    LoggedUser = '[Auth] LOGED_USER',
    LoginUser = '[Auth] LOGIN_USER',
    LoginUserError = '[Auth] LOGIN_USER_ERROR',
    LoggedIn = '[Auth] LOGGED_IN',
    LogoutAuth = '[Auth] LOGOUT_USER',

    ShowAndHideChangePassword = '[Auth] OPEN_OR_CLOSE_CHANGE_PASSWORD',
    ChangePassword = '[Auth] ChangePassword',
    GoToDashBoard = '[Auth] GoToDashBoard',
    ResestLogin = '[Auth] ResestLogin',
}


export class LoggedIn implements Action {
    readonly type = AuthActionTypes.LoggedIn;
    constructor(public payload: { isLogin: boolean }) { }
}


export class LogoutAuth implements Action {
    readonly type = AuthActionTypes.LogoutAuth;
    constructor(public payload: { isLogin: boolean }) { }
}

export class LoginUser implements Action {
    readonly type = AuthActionTypes.LoginUser;
    constructor(public payload: any) { }
}

export class LoggedUser implements Action {
    readonly type = AuthActionTypes.LoggedUser;
    constructor(public payload: any) { }
}


export class LoginUserError implements Action {
    readonly type = AuthActionTypes.LoginUserError;
    constructor(public payload: { error: String }) { }
}

export class ShowAndHideChangePassword implements Action {
    readonly type = AuthActionTypes.ShowAndHideChangePassword;
    //constructor(public payload: any) { }
}

export class ChangePassword implements Action {
    readonly type = AuthActionTypes.ChangePassword;
    constructor(public payload: { password1: String, password2: String }) { }
}

export class GoToDashBoard implements Action {
    readonly type = AuthActionTypes.GoToDashBoard;
}

export class ResestLogin implements Action {
    readonly type = AuthActionTypes.ResestLogin;
}




export type actions =
    LoggedIn |
    LogoutAuth |
    LoginUser |
    LoggedUser |
    LoginUserError |
    ShowAndHideChangePassword |
    ChangePassword |
    GoToDashBoard | ResestLogin;