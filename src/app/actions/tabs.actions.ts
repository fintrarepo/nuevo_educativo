import { Action } from '@ngrx/store';



export enum TabsTypes {
    SelecteTab1SubTab1 = '[TABS] SelecteTab1SubTab1',
    SelecteTab1SubTab2 = '[TABS] SelecteTab1SubTab1',
    SelecteTab1SubTab3 = '[TABS] SelecteTab1SubTab1',

}



export class SelecteTab1SubTab1 implements Action {
    readonly type = TabsTypes.SelecteTab1SubTab1;
}
export class SelecteTab1SubTab2 implements Action {
    readonly type = TabsTypes.SelecteTab1SubTab1;
}
export class SelecteTab1SubTab3 implements Action {
    readonly type = TabsTypes.SelecteTab1SubTab1;
}




export type actions = SelecteTab1SubTab1;



