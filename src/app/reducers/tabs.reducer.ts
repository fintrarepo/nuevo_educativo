import { TabsTypes, SelecteTab1SubTab1 } from '../actions/tabs.actions';
import * as TabsActions from '../actions/tabs.actions';
// import { ITabs as State } from '../models/tabs.model';
import { Tabs } from '../state/tabs.state';

export interface State {
    tab1: ITab,
    tab2: ITab,
    tab1SubTab1: ITab,
    tab1SubTab2: ITab,
    tab1SubTab3: ITab,

    tab2SubTab1: ITab,
    tab2SubTab2: ITab,
}

interface ITab {
    active: boolean;
    disabled: boolean;
}


export function tabsReducer(state = Tabs, action: TabsActions.actions): State {

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
                // tab1SubTab1: {
                //     active: false,
                //     disabled: false

                // },
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


export const getTabsState = (state: State) => state;

export const getTab1SubTab1State = (state: State) => state.tab1SubTab1;
export const getTab1SubTab2State = (state: State) => state.tab1SubTab2;
export const getTab1SubTab3State = (state: State) => state.tab1SubTab3;
export const getTab2SubTab1State = (state: State) => state.tab2SubTab1;
export const getTab2SubTab2State = (state: State) => state.tab2SubTab2;


