import * as PlaformActions from '../actions/platform.actions';
import { PlatformActionTypes, InfoFormRequestResponse } from '../actions/platform.actions';


export interface State {
    isBlur: boolean;
    formData: any;
}

const initialState: State = {
    isBlur: false,
    formData: null
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

        default:
            return state;
    }

}

export const getPlatformState = (state: State) => state;
export const getPlatformIsBlur = (state: State) => state.isBlur;
export const getPlatformDataForm = (state: State) => state.formData;

