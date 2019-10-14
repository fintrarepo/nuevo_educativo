import { TabsTypes, SelecteTab1SubTab1 } from '../actions/tabs.actions';
import * as TabsActions from '../actions/tabs.actions';
import { ITabs } from '../models/tabs.model';
import { Tabs } from '../state/tabs.state'

export { ITabs as State };

export const tabsReducer = (state = Tabs, action: TabsActions.actions): ITabs => {

    switch (action.type) {
        case TabsTypes.SelecteTab1: {
            return {
                ...Tabs,
                tab1: {
                    active: true,
                    disabled: false
                },
                tab1SubTab1: {
                    active: true,
                    disabled: false

                }
            }
        }
        case TabsTypes.SelecteTab2: {
            return {
                ...Tabs,
                tab2: {
                    active: true,
                    disabled: false
                }
            }
        }

        case TabsTypes.SelecteTab1SubTab1: {
            return {
                ...Tabs,
                tab1: {
                    active: true,
                    disabled: false
                },
                tab1SubTab1: {
                    active: true,
                    disabled: false

                }
            }
        }

        case TabsTypes.SelecteTab1SubTab2: {
            return {
                ...Tabs,
                tab1: {
                    active: true,
                    disabled: false
                },
                tab1SubTab2: {
                    active: true,
                    disabled: false
                }
            }
        }

        case TabsTypes.SelecteTab1SubTab3: {
            return {
                ...Tabs,
                tab1: {
                    active: true,
                    disabled: false
                },
                tab1SubTab3: {
                    active: true,
                    disabled: false

                }
            }
        }


        case TabsTypes.SelecteTab2SubTab1: {
            return {
                ...Tabs,
                tab2: {
                    active: true,
                    disabled: false
                },
                tab2SubTab1: {
                    active: true,
                    disabled: false

                }
            }
        }


        case TabsTypes.SelecteTab2SubTab2: {
            return {
                ...Tabs,
                tab2: {
                    active: true,
                    disabled: false
                },
                tab2SubTab2: {
                    active: true,
                    disabled: false

                }
            }
        }



        default:
            return {
                ...state
            };
    }

}


export const getTabsState = (state: ITabs) => state;


