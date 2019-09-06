import * as PlaformActions from '../actions/platform.actions';
import { PlatformActionTypes } from '../actions/platform.actions';


export interface State {
    isBlur: boolean;
}

const initialState: State = {
    isBlur: false,
}

export function PlatformReducer(state: State = initialState, action: PlaformActions.actions) {

    switch (action.type) {
        case PlatformActionTypes.ToggleBlurPage:
            return {
                ...state,
                isBlur: !state.isBlur
            };

        default:
            return state;
    }

}

export const getPlatformState = (state: State) => state;
export const getPlatformIsBlur = (state: State) => state.isBlur;
