import { ETabs1SubTab1ActionsTypes } from '../actions/tab1SubTab1.actions';
import * as ETabs1Actions from '../actions/tab1SubTab1.actions';
import { ITab1SubTab1 } from '../models/tabs.model';
import { initialTab1State } from '../state/tabs.state'

export const tabs1Reducer = (state = initialTab1State, action: ETabs1Actions.actions): ITab1SubTab1 => {

    switch (action.type) {
        case ETabs1SubTab1ActionsTypes.SendTab1SubTab1: {
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


