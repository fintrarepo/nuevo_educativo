import { TabsTypes } from '../actions/tabs.actions';
import * as TabsActions from '../actions/tabs.actions';
import { ITabs } from '../models/tabs.model';
import { Tabs } from '../state/tabs.state'

export { ITabs as State };

export const tabsReducer = (state = Tabs, action: TabsActions.actions): ITabs => {

    switch (action.type) {
        case TabsTypes.SelecteTab1SubTab1: {
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


export const getTabsState = (state: ITabs) => state;


