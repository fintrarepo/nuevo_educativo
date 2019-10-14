import { Action } from '@ngrx/store';



export enum TabsTypes {
    SelecteTab1SubTab1 = '[TABS] SelecteTab1SubTab1',
    SelecteTab1SubTab2 = '[TABS] SelecteTab1SubTab2',
    SelecteTab1SubTab3 = '[TABS] SelecteTab1SubTab3',

    SelecteTab1 = '[TABS] SelecteTab1',
    SelecteTab2 = '[TABS] SelecteTab2',

    SelecteTab2SubTab1 = '[TABS] SelecteTab2SubTab1',
    SelecteTab2SubTab2 = '[TABS] SelecteTab2SubTab2',

}



export class SelecteTab1SubTab1 implements Action {
    readonly type = TabsTypes.SelecteTab1SubTab1;
}
export class SelecteTab1SubTab2 implements Action {
    readonly type = TabsTypes.SelecteTab1SubTab2;
}
export class SelecteTab1SubTab3 implements Action {
    readonly type = TabsTypes.SelecteTab1SubTab3;
}

export class SelecteTab1 implements Action {
    readonly type = TabsTypes.SelecteTab1;
}

export class SelecteTab2 implements Action {
    readonly type = TabsTypes.SelecteTab2;
}



export class SelecteTab2SubTab1 implements Action {
    readonly type = TabsTypes.SelecteTab2SubTab1;
}
export class SelecteTab2SubTab2 implements Action {
    readonly type = TabsTypes.SelecteTab2SubTab2;
}




export type actions = SelecteTab1SubTab1 |
    SelecteTab1SubTab2 |
    SelecteTab1SubTab3 |
    SelecteTab2 |
    SelecteTab1 |
    SelecteTab2SubTab1 |
    SelecteTab2SubTab2;



