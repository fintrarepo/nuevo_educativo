import { ETabs1ActionsTypes } from '../actions/tabs.actions';
import * as ETabs1Actions from '../actions/tabs.actions';
import { ITab1 } from '../models/tabs.model';
import { initialTab1State } from '../state/tabs.state'

export const tabs1Reducer = (state = initialTab1State, action: ETabs1Actions.actions): ITab1 => {

    switch (action.type) {
        case ETabs1ActionsTypes.SendTab1: {
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


