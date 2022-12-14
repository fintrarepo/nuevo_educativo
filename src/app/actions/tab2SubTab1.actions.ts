import { Action } from '@ngrx/store';
import { ITab2SubTab1RequestData } from '../models/tabs.model';




export enum ETabs2SubTab1ActionsTypes {
    PreSendTab2SubTab1 = '[Tabs] PreSendTab2SubTab1',
    SendTab2SubTab1 = '[Tabs] SendTab2SubTab1',

    SendTab2SubTab1Approved = '[Tabs] SendTab2SubTab1Approved',

    SendTab2SubTab1ResponseSuccess = '[Tabs] SendTab2SubTab1ResponseSuccess',
    SendTab2SubTab1ResponseError = '[Tabs] SendTab2SubTab1ResponseError',

    SendTab2SubTab1ResponseNextStep = '[Tabs] SendTab2SubTab1ResponseNextStep'
}




//TAB 1
export class PreSendTab2SubTab1 implements Action {
    public readonly type = ETabs2SubTab1ActionsTypes.PreSendTab2SubTab1;
    constructor(public payload: ITab2SubTab1RequestData) { }
}

export class SendTab2SubTab1 implements Action {
    public readonly type = ETabs2SubTab1ActionsTypes.SendTab2SubTab1;
    constructor(public payload: ITab2SubTab1RequestData) { }
}

export class SendTab2SubTab1Approved implements Action {
    public readonly type = ETabs2SubTab1ActionsTypes.SendTab2SubTab1Approved;
}



export class SendTab2SubTab1ResponseSuccess implements Action {
    public readonly type = ETabs2SubTab1ActionsTypes.SendTab2SubTab1ResponseSuccess;
    constructor(public payload: any) { }
}

export class SendTab2SubTab1ResponseError implements Action {
    public readonly type = ETabs2SubTab1ActionsTypes.SendTab2SubTab1ResponseError;
    constructor(public payload: any) { }
}



export class SendTab2SubTab1ResponseNextStep implements Action {
    public readonly type = ETabs2SubTab1ActionsTypes.SendTab2SubTab1ResponseNextStep;
}




export type actions = SendTab2SubTab1 |
    SendTab2SubTab1ResponseSuccess |
    SendTab2SubTab1ResponseError |
    SendTab2SubTab1ResponseNextStep | PreSendTab2SubTab1;


