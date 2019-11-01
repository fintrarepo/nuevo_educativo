import { Action } from '@ngrx/store';
import { ITab1SubTab1, ITab1SubTab2RequestData } from '../models/tabs.model';




export enum ETabs2SubTab2ActionsTypes {
    PreSendTab2SubTab2 = '[Tabs] PreSendTab2SubTab2',
    SendTab2SubTab2 = '[Tabs] SendTab2SubTab2',

    SendTab2SubTab2Approved = '[Tabs] SendTab2SubTab2Approved',

    SendTab2SubTab2ResponseSuccess = '[Tabs] SendTab2SubTab2ResponseSuccess',
    SendTab2SubTab2ResponseError = '[Tabs] SendTab2SubTab2ResponseError',

    SendTab2SubTab2ResponseNextStep = '[Tabs] SendTab2SubTab2ResponseNextStep'
}




//TAB 1
export class PreSendTab2SubTab2 implements Action {
    public readonly type = ETabs2SubTab2ActionsTypes.PreSendTab2SubTab2;
    constructor(public payload: ITab1SubTab2RequestData) { }
}

export class SendTab2SubTab2 implements Action {
    public readonly type = ETabs2SubTab2ActionsTypes.SendTab2SubTab2;
    constructor(public payload: ITab1SubTab2RequestData) { }
}

export class SendTab2SubTab2Approved implements Action {
    public readonly type = ETabs2SubTab2ActionsTypes.SendTab2SubTab2Approved;
}

export class SendTab2SubTab2ResponseSuccess implements Action {
    public readonly type = ETabs2SubTab2ActionsTypes.SendTab2SubTab2ResponseSuccess;
    constructor(public payload: any) { }
}

export class SendTab2SubTab2ResponseError implements Action {
    public readonly type = ETabs2SubTab2ActionsTypes.SendTab2SubTab2ResponseError;
    constructor(public payload: any) { }
}

export class SendTab2SubTab2ResponseNextStep implements Action {
    public readonly type = ETabs2SubTab2ActionsTypes.SendTab2SubTab2ResponseNextStep;
}





export type actions = SendTab2SubTab2 |
    SendTab2SubTab2ResponseSuccess |
    SendTab2SubTab2ResponseError | SendTab2SubTab2ResponseNextStep | PreSendTab2SubTab2 | SendTab2SubTab2Approved; 


