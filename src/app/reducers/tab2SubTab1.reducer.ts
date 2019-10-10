import { ETabs2SubTab1ActionsTypes } from '../actions/tab2SubTab1.actions';
import * as ETabs2Actions from '../actions/tab2SubTab1.actions';
import { ITab2SubTab1 } from '../models/tabs.model';
import { initialTab2SubTab1 } from '../state/tabs.state'

export const tabs2SubTab1Reducer = (state = initialTab2SubTab1, action: ETabs2Actions.actions): ITab2SubTab1 => {

    switch (action.type) {
        case ETabs2SubTab1ActionsTypes.SendTab2SubTab1: {
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


