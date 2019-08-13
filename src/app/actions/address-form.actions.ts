import { Action } from '@ngrx/store';
import { actions } from './auth.actions';
import { iAddressForm } from '../models/address.model';


export enum AddressFormActionTypes {
    OpenForm = '[Address Form] OPEN_FORM',
    ClosedForm = '[Address Form] CLOSED_FORM',
    ConfirmAddress = '[Address Form] CONFIRM_ADDRESS',
    CleanForm = '[Address Form] CLEAN_FORM',
    FormatAddress = '[Address Form] FORMAT_ADDRESS'
}



export class OpenForm implements Action {
    readonly type = AddressFormActionTypes.OpenForm;
    // constructor(public payload: iAddressForm) { }
}


export class ClosedForm implements Action {
    readonly type = AddressFormActionTypes.ClosedForm;
}

export class CleanForm implements Action {
    readonly type = AddressFormActionTypes.CleanForm;
}

export class ConfirmAddress implements Action {
    readonly type = AddressFormActionTypes.ConfirmAddress;
    constructor(public payload: iAddressForm) { }
}

export class FormatAddress implements Action {
    readonly type = AddressFormActionTypes.FormatAddress;
}

export type actions = OpenForm | ClosedForm | ConfirmAddress | CleanForm | FormatAddress;



