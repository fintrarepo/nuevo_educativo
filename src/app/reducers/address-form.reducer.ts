import { iAddressForm } from '../models/address.model';
import * as AddressFormActions from '../actions/address-form.actions';
import { AddressFormActionTypes } from '../actions/address-form.actions';

export interface State {
    visible: boolean,
    departamento: String,
    ciudad: String,
    tipo_via: String,
    via_principal: String,
    numero_1: String,
    numero_2: String,
    complementoDireccion?: String,
    direccionFormateada?: String,
    fieldDestinity: String
}


const initialState: State = {
    visible: false,
    departamento: "",
    ciudad: "",
    tipo_via: "",
    via_principal: "",
    numero_1: "",
    numero_2: "",
    complementoDireccion: "",
    direccionFormateada: "",
    fieldDestinity: null
}

export function AddressFormReducer(state: State = initialState, action: AddressFormActions.actions) {

    switch (action.type) {
        case AddressFormActionTypes.OpenForm:
            return {
                ...state,
                fieldDestinity: action.payload.fieldDestinity,
                visible: true
            };

        case AddressFormActionTypes.ClosedForm:
            return {
                ...state,
                visible: false
            }

        case AddressFormActionTypes.ConfirmAddress:
            return {
                ...action.payload,
                fieldDestinity: state.fieldDestinity
            }

        case AddressFormActionTypes.CleanForm:
            return {
                ...state
            }

        case AddressFormActionTypes.FormatAddress:
            return {
                ...state,
                direccionFormateada: state.tipo_via + " " + state.via_principal + " #" + state.numero_1 + " - " + state.numero_2
            }

        default:
            return state;
    }

}

export const getAddressFormState = (state: State) => state;
export const getAddressFormVisible = (state: State) => state.visible;
