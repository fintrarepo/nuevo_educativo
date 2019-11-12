import * as PlaformActions from '../actions/platform.actions';
import { PlatformActionTypes, InfoFormRequestResponse, LoadCitys } from '../actions/platform.actions';


export interface State {
    isBlur: boolean;
    formData: any;
    dpto: String;
    citys: any;
    showApproved: boolean;
    currentBussinees: any;
    showLoadingForm: boolean;
    showNotApproved: boolean;
}

const initialState: State = {
    isBlur: false,
    formData: null,
    dpto: '',
    citys: null,
    showApproved: false,
    currentBussinees: null,
    showLoadingForm: false,
    showNotApproved: false
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

        case PlatformActionTypes.ShowOrHiddeApproved:
            return {
                ...state,
                showApproved: action.payload
            };

        case PlatformActionTypes.SetCurrentBussinees:
            return {
                ...state,
                currentBussinees: action.payload
            };

        case PlatformActionTypes.ShowOrHiddenLoadingForm:
            return {
                ...state,
                showLoadingForm: action.payload
            };

        case PlatformActionTypes.ShowNotApproved:
            return {
                ...state,
                showNotApproved: action.payload
            };


        default:
            return state;
    }

}

export const getPlatformState = (state: State) => state;
export const getPlatformIsBlur = (state: State) => state.isBlur;
export const getPlatformDataForm = (state: State) => state.formData;
export const getPlatformIsApproved = (state: State) => state.showApproved;
export const getPlatCitys = (state: State) => state.citys;
export const getLoadingFormIsShow = (state: State) => state.showLoadingForm;
export const getCurrentBussinness = (state: State) => state.currentBussinees;
export const isShowNotApproved = (state: State) => state.showNotApproved;

