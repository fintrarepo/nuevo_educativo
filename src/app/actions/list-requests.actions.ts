import { Action } from '@ngrx/store';


export enum ListRequestsActionTypes {
    GetListRequest = '[ListRequests] GET_LIST_REQUEST',
    GetListRequestSuccess = '[ListRequests] GET_LIST_REQUEST_SUCCESS',
    GetListRequestError = '[ListRequests] GET_LIST_REQUEST_ERROR',
}



export class GetListRequest implements Action {
    readonly type = ListRequestsActionTypes.GetListRequest;
    constructor(public payload: { filter: any }) { }
}

export class GetListRequestSuccess implements Action {
    readonly type = ListRequestsActionTypes.GetListRequestSuccess;
    constructor(public payload: { requests: any[] }) { }
}

export class GetListRequestError implements Action {
    readonly type = ListRequestsActionTypes.GetListRequestError;
    constructor(public payload: { error: String }) { }
}


export type actions = GetListRequest |
    GetListRequestSuccess |
    GetListRequestError;



