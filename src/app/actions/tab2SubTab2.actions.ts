import { Action } from '@ngrx/store';
import { ITab1SubTab1, ITab1SubTab2RequestData } from '../models/tabs.model';




export enum ETabs2SubTab2ActionsTypes {
    SendTab2SubTab2 = '[Tabs] SendTab1SubTab1',
    SendTab2SubTab2ResponseSuccess = '[Tabs] SendTab1SubTab1ResponseSuccess',
    SendTab2SubTab2ResponseError = '[Tabs] SendTab1SubTab1ResponseError',

   
}




//TAB 1

export class SendTab2SubTab2 implements Action {
    public readonly type = ETabs2SubTab2ActionsTypes.SendTab2SubTab2;
    constructor(public payload: ITab1SubTab2RequestData) { }
}

export class SendTab2SubTab2ResponseSuccess implements Action {
    public readonly type = ETabs2SubTab2ActionsTypes.SendTab2SubTab2ResponseSuccess;
    constructor(public payload: any) { }
}

export class SendTab2SubTab2ResponseError implements Action {
    public readonly type = ETabs2SubTab2ActionsTypes.SendTab2SubTab2ResponseError;
    constructor(public payload: any) { }
}




export type actions = SendTab2SubTab2 |
    SendTab2SubTab2ResponseSuccess |
    SendTab2SubTab2ResponseError 


