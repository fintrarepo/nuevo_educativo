import { ETabs1SubTab3ActionsTypes, SendTab1SubTab3 } from '../actions/tab1SubTab3.actions';
import * as ETabs1SubTab3Actions from '../actions/tab1SubTab3.actions';
import { ITab1SubTab3 } from '../models/tabs.model';
import { initialTab1SubTab3State } from '../state/tabs.state'

export const tabs1SubTab3Reducer = (state = initialTab1SubTab3State, action: ETabs1SubTab3Actions.actions): ITab1SubTab3 => {

    switch (action.type) {
        case ETabs1SubTab3ActionsTypes.SendTab1SubTab3: {
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


