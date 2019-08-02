import { TabsActions, ETabsActions, ToggleDisabledTab1SubTab1 } from '../actions/tabs.actions';
import { ITabs } from '../models/tabs.model';
import { initialTab1State, initialTab2State, initialTab1SubTab1State, initialTab1SubTab2State, initialTab1SubTab3State } from '../state/tabs.state';

export const tabs1Reducer = (state = initialTab1State, action: TabsActions): ITabs => {

    switch (action.type) {
        case ETabsActions.ToggleDisabledTab1: {
            return {
                ...state,
                disabled: action.payload
            }
        }

        default:
            return {
                ...state
            };
    }

}
export const tabs1Subtab1Reducer = (state = initialTab1SubTab1State, action: TabsActions): ITabs => {

    switch (action.type) {
        case ETabsActions.ToggleDisabledTab1SubTab1: {
            return {
                ...state,
                disabled: action.payload
            }
        }

        default:
            return {
                ...state
            };
    }

}
export const tabs1Subtab2Reducer = (state = initialTab1SubTab2State, action: TabsActions): ITabs => {

    switch (action.type) {
        case ETabsActions.ToggleDisabledTab1SubTab2: {
            return {
                ...state,
                disabled: action.payload
            }
        }

        default:
            return {
                ...state
            };
    }

}
export const tabs1Subtab3Reducer = (state = initialTab1SubTab3State, action: TabsActions): ITabs => {

    switch (action.type) {
        case ETabsActions.ToggleDisabledTab1SubTab3: {
            return {
                ...state,
                disabled: action.payload
            }
        }

        default:
            return {
                ...state
            };
    }

}





export const tabs2Reducer = (state = initialTab2State, action: TabsActions): ITabs => {

    switch (action.type) {
        case ETabsActions.ToggleDisabledTab2: {
            return {
                ...state,
                disabled: action.payload
            }
        }

        default:
            return {
                ...state
            };
    }

}

