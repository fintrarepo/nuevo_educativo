import { ITabs } from '../models/tabs.model';


export interface ITabsState {
    tab: ITabs
}


//TAB 1
export const initialTab1State: ITabs = {
    active: false,
    disabled: false,
    title: "INFORMACIÓN SOLICITANTE",
    id: "tab1"
}


export const initialTab1SubTab1State: ITabs = {
    active: true,
    disabled: false,
    title: "INFORMACIÓN PERSONAL",
    id: "tab1-subtab1"
}

export const initialTab1SubTab2State: ITabs = {
    active: false,
    disabled: true,
    title: "INFORMACIÓN LABORAL",
    id: "tab1-subtab2"
}


export const initialTab1SubTab3State: ITabs = {
    active: false,
    disabled: true,
    title: "REFERENCIAS",
    id: "tab1-subtab3"
}



//TAB 2
export const initialTab2State: ITabs = {
    active: false,
    disabled: true,
    title: "INFORMACIÓN ESTUDIANTE",
    id: "tab2"
}



