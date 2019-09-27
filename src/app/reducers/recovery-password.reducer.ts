import * as RecoveryPasswordActions from '../actions/recovery-password.actions';
import { RecoveryPasswordActionTypes } from '../actions/recovery-password.actions';


export interface State {
    identificacion: number;
    error: String;
    currentStep: number;
    isOpen: boolean;
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
    methods: null
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
                recoveryMethod: action.payload.recoveryMethod
            }

        case RecoveryPasswordActionTypes.SetEmailAndCelular:
            return {
                ...state,
                methods: action.payload
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
