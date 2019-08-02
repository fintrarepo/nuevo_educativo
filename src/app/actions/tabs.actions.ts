import { Action } from '@ngrx/store';
import { ITabs } from '../models/tabs.model';

export enum ETabsActions {
    ToggleDisabledTab1 = '[Tabs] ToggleDisabledTab1',
    ToggleDisabledTab1SubTab1 = '[Tabs] ToggleDisabledTab1SubTab1',
    ToggleDisabledTab1SubTab2 = '[Tabs] ToggleDisabledTab1SubTab2',
    ToggleDisabledTab1SubTab3 = '[Tabs] ToggleDisabledTab1SubTab3',

    ToggleDisabledTab2 = '[Tabs] ToggleDisabledTab2',

}
//TAB 1
export class ToggleDisabledTab1 implements Action {
    public readonly type = ETabsActions.ToggleDisabledTab1;

    constructor(public payload: boolean) { }
}

export class ToggleDisabledTab1SubTab1 implements Action {
    public readonly type = ETabsActions.ToggleDisabledTab1SubTab1;

    constructor(public payload: boolean) { }
}

export class ToggleDisabledTab1SubTab2 implements Action {
    public readonly type = ETabsActions.ToggleDisabledTab1SubTab2;

    constructor(public payload: boolean) { }
}

export class ToggleDisabledTab1SubTab3 implements Action {
    public readonly type = ETabsActions.ToggleDisabledTab1SubTab3;

    constructor(public payload: boolean) { }
}




//TAB 2
export class ToggleDisabledTab2 implements Action {
    public readonly type = ETabsActions.ToggleDisabledTab2;

    constructor(public payload: boolean) { }
}


export type TabsActions =
    ToggleDisabledTab1 |
    ToggleDisabledTab1SubTab1 |
    ToggleDisabledTab1SubTab2 |
    ToggleDisabledTab1SubTab3 |
    ToggleDisabledTab2;