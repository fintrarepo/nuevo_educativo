import * as PlaformActions from '../actions/platform.actions';
import { PlatformActionTypes, InfoFormRequestResponse, LoadCitys } from '../actions/platform.actions';


export interface State {
    isBlur: boolean;
    formData: any;
    dpto: String;
    citys: any;
}

const initialState: State = {
    isBlur: false,
    formData: null,
    dpto: '',
    citys: null
}

export function PlatformReducer(state: State = initialState, action: PlaformActions.actions) {

    switch (action.type) {
        case PlatformActionTypes.ToggleBlurPage:
            return {
                ...state,
                isBlur: !state.isBlur
            };


        case PlatformActionTypes.InfoFormRequest:
            return {
                ...state
            };


        case PlatformActionTypes.InfoFormRequestResponse:
            return {
                ...state,
                formData: action.payload
            };

        case PlatformActionTypes.LoadCitys:
            return {
                ...state,
                dpto: action.payload.dpto
            };

        case PlatformActionTypes.LoadCitysResponse:
            return {
                ...state,
                citys: action.payload
            };

        default:
            return state;
    }

}

export const getPlatformState = (state: State) => state;
export const getPlatformIsBlur = (state: State) => state.isBlur;
export const getPlatformDataForm = (state: State) => state.formData;
export const getPlatCitys = (state: State) => state.citys;

