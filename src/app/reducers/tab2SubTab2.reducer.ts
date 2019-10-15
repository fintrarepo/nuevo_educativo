import { ETabs2SubTab2ActionsTypes } from '../actions/tab2SubTab2.actions';
import * as ETabs2Actions from '../actions/tab2SubTab2.actions';
import { ITab2SubTab1 } from '../models/tabs.model';
import { initialTab2SubTab1 } from '../state/tabs.state'

export const tabs2SubTab2Reducer = (state = initialTab2SubTab1, action: ETabs2Actions.actions): ITab2SubTab1 => {

    switch (action.type) {
        case ETabs2SubTab2ActionsTypes.SendTab2SubTab2: {
            return {
                ...state,
            }
        }


        default:
            return {
                ...state
            };
    }

}


