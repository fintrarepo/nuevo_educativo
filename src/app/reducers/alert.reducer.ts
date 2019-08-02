import * as AlertActions from '../actions/alert.actions';
import { AlertActionTypes } from '../actions/alert.actions';


export interface State {
    open: boolean;
    type: String;
    title: String;
    subTitle: String;
}



const initialState: State = {
    open: false,
    type: "",
    title: "",
    subTitle: ""
}


export function AlertReducer(state: State = initialState, action: AlertActions.actions) {

    switch (action.type) {
        case AlertActionTypes.OpenAlert:
            return {
                ...state,
                ...action.payload
            };

        case AlertActionTypes.ClosedAlert:
            return {
                ...state,
                open: false
            }

        default:
            return state;
    }

}


export const getAlertState = (state: State) => state;
export const getAlertIsOpen = (state: State) => state.open;
export const getAlertTitle = (state: State) => state.title;
export const getAlertSubTitle = (state: State) => state.subTitle;
export const getAlertType = (state: State) => state.type;
