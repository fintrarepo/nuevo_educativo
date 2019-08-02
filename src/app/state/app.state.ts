import { RouterReducerState } from '@ngrx/router-store';
import { ITabs } from '../models/tabs.model';
import { initialTab1State, initialTab2State, ITabsState, initialTab1SubTab1State, initialTab1SubTab2State, initialTab1SubTab3State } from './tabs.state';


export interface IAppState {
    // router?: RouterReducerState;
    tab1: ITabs;
    tab1SubTab1: ITabs;
    tab1SubTab2: ITabs;
    tab1SubTab3: ITabs;

    tab2: ITabs;


}


export const initalAppState: IAppState = {
    tab1: initialTab1State,
    tab2: initialTab2State,
    tab1SubTab1: initialTab1SubTab1State,
    tab1SubTab2: initialTab1SubTab2State,
    tab1SubTab3: initialTab1SubTab3State
}


export function getInitialState(): IAppState {
    return initalAppState;
}