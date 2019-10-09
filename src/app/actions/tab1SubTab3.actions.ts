import { Action } from '@ngrx/store';
import { ITab1SubTab3RequestData } from '../models/tabs.model';




export enum ETabs1SubTab3ActionsTypes {
    SendTab1SubTab3 = '[Tabs] SendTab1SubTab3',
    SendTab1SubTab3ResponseSuccess = '[Tabs] SendTab1SubTab3ResponseSuccess',
    SendTab1SubTab3ResponseError = '[Tabs] SendTab1SubTab3ResponseError',
}




//TAB 1

export class SendTab1SubTab3 implements Action {
    public readonly type = ETabs1SubTab3ActionsTypes.SendTab1SubTab3;
    constructor(public payload: ITab1SubTab3RequestData) { }
}

export class SendTab1SubTab3ResponseSuccess implements Action {
    public readonly type = ETabs1SubTab3ActionsTypes.SendTab1SubTab3ResponseSuccess;
    constructor(public payload: any) { }
}

export class SendTab1SubTab3ResponseError implements Action {
    public readonly type = ETabs1SubTab3ActionsTypes.SendTab1SubTab3ResponseError;
    constructor(public payload: any) { }
}



export type actions = SendTab1SubTab3 |
    SendTab1SubTab3ResponseSuccess |
    SendTab1SubTab3ResponseError;


