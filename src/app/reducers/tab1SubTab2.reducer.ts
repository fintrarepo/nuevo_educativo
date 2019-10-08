import { ETabs1SubTab2ActionsTypes } from '../actions/tab1SubTab2.actions';
import * as ETabs1SubTab2Actions from '../actions/tab1SubTab2.actions';
import { ITab1SubTab2 } from '../models/tabs.model';
import { initialTab1SubTab2State } from '../state/tabs.state'

export const tabs1SubTab2Reducer = (state = initialTab1SubTab2State, action: ETabs1SubTab2Actions.actions): ITab1SubTab2 => {

    switch (action.type) {
        case ETabs1SubTab2ActionsTypes.SendTab1SubTab2: {
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


