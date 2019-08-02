import * as AuthActions from '../actions/auth.actions';
import { AuthActionTypes } from '../actions/auth.actions';


export interface State {
    user: any;
    tokens: any,
    error: String;
    isLoading: boolean;
}



const initialState: State = {
    user: "",
    tokens: "",
    error: "",
    isLoading: false
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
                token: action.payload
            }
        case AuthActionTypes.LoginUserError:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }

        default:
            return state;
    }

}




export const getAuthState = (state: State) => state.user;
export const getAuthLoading = (state: State) => state.isLoading;
export const getAuthError = (state: State) => state.error;
export const getAuthAction = (action: any) => action.payload;