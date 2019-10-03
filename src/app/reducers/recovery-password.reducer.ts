import * as RecoveryPasswordActions from '../actions/recovery-password.actions';
import { RecoveryPasswordActionTypes, RecoveryChangePassword } from '../actions/recovery-password.actions';


export interface State {
    identificacion: number;
    error: String;
    currentStep: number;
    isOpen: boolean;
    password: String,
    password2: String,
    codigo: String,
    methods: {
        type: String;
        valure: String;
    }
}

const initialState: State = {
    identificacion: null,
    error: "",
    currentStep: 1,
    isOpen: false,
    methods: null,
    password: "",
    password2: "",
    codigo: ""
}

export function RecoveryPasswordReducer(state: State = initialState, action: RecoveryPasswordActions.actions) {

    switch (action.type) {
        case RecoveryPasswordActionTypes.OpenRecoveryPassword:
            return {
                ...state,
                isOpen: true
            }

        case RecoveryPasswordActionTypes.CloseRecoveryPassword:
            return {
                ...state,
                isOpen: false
            }

        case RecoveryPasswordActionTypes.SendIdUser:
            return {
                ...state,
                identificacion: action.payload.identificacion
            }

        case RecoveryPasswordActionTypes.SendIdUserError:
            return {
                ...state,
                error: action.payload.error
            }

        case RecoveryPasswordActionTypes.SendIdUserSuccess:
            return {
                ...state,
                currentStep: 2
            }

        case RecoveryPasswordActionTypes.SendRecoveryMethod:
            return {
                ...state,
                recoveryMethod: action.payload,
                currentStep: 3
            }

        case RecoveryPasswordActionTypes.SetEmailAndCelular:
            return {
                ...state,
                methods: action.payload
            }

        case RecoveryPasswordActionTypes.RecoveryChangePassword:
            return {
                ...state,
                password1: action.payload.password1,
                password2: action.payload.password2,
                codigo: action.payload.codigo,
                identificacion: action.payload.identificacion
            }

        case RecoveryPasswordActionTypes.CancelRecovery:
            return {
                ...state,
                currentStep: 1,
                password1: "",
                password2: "",
                codigo: "",
                identificacion: "",
                isOpen: false
            }


        default:
            return state;
    }

}

export const getRecoveryPasswordState = (state: State) => state;
export const getRecoveryPasswordIsOpen = (state: State) => state.isOpen;
export const getRecoveryPasswordMethods = (state: State) => state.methods;
export const getRecoveryPasswordCurrentStep = (state: State) => state.currentStep;
export const getRecoveryPasswordError = (state: State) => state.error;
