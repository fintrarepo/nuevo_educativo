import * as AuthActions from '../actions/auth.actions';
import { AuthActionTypes, ChangePassword, ResestLogin } from '../actions/auth.actions';


export interface State {
    user: any;
    token: any,
    error: String;
    isLoading: boolean;
    isOpenChangePassword: boolean;
    password1: String;
    password2: String;
    name: String;
    tipo_usuario: String;
    cambio_clave: boolean;
}



const initialState: State = {
    user: "",
    token: "",
    name: "",
    tipo_usuario: "",
    cambio_clave: false,
    error: "",
    isLoading: false,
    isOpenChangePassword: false,
    password1: "",
    password2: ""
}


export function AuthReducer(state: State = initialState, action: AuthActions.actions) {

    switch (action.type) {
        case AuthActionTypes.LoginUser:
            return {
                ...state,
                isLoading: true,
            };

        case AuthActionTypes.LoggedUser:
            return {
                ...state,
                isLoading: false,
                token: action.payload.token,
                name: action.payload.name,
                cambio_clave: action.payload.cambio_clave
            }

        case AuthActionTypes.LoginUserError:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }

        case AuthActionTypes.ShowAndHideChangePassword:
            return {
                ...state,
                isOpenChangePassword: !state.isOpenChangePassword,
                // token: action.payload.token,
                // name: action.payload.name,
                // cambio_clave: action.payload.cambio_clave
            }

        case AuthActionTypes.ChangePassword:
            return {
                ...state,
                password1: action.payload.password1,
                password2: action.payload.password2
            }

        case AuthActionTypes.ResestLogin:
            return initialState;
        default:
            return state;
    }

}




export const getAuthState = (state: State) => state.user;
export const getAuthLoading = (state: State) => state.isLoading;
export const getAuthError = (state: State) => state.error;
export const getAuthAction = (action: any) => action.payload;
export const getIsOpenChangePassword = (state: State) => state.isOpenChangePassword;