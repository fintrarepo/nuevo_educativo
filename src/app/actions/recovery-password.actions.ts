import { Action } from '@ngrx/store';

interface methodsRecovery {
    type: String;
    value: String;
}
export enum RecoveryPasswordActionTypes {
    OpenRecoveryPassword = '[RecoveryPassword] OPEN_RECOVERY_PASSWORD',
    CloseRecoveryPassword = '[RecoveryPassword] CLOSE_RECOVERY_PASSWORD',

    SendIdUser = '[RecoveryPassword] SEND_ID_RECOVERY',
    SendIdUserSuccess = '[RecoveryPassword] SEND_ID_SUCCESS',
    SendIdUserError = '[RecoveryPassword] SEND_ID_ERROR',
    NextStep = '[RecoveryPassword] NEXT_STEP',
    SetEmailAndCelular = '[RecoveryPassword] SET_EMAIL_AND_PHONE',

    SendRecoveryMethod = '[RecoveryPassword] SEND_RECOVERY_MEHOD'
}



export class OpenRecoveryPassword implements Action {
    readonly type = RecoveryPasswordActionTypes.OpenRecoveryPassword;
}


export class CloseRecoveryPassword implements Action {
    readonly type = RecoveryPasswordActionTypes.CloseRecoveryPassword;
}


export class SendIdUser implements Action {
    readonly type = RecoveryPasswordActionTypes.SendIdUser;
    constructor(public payload: { identificacion: String }) { }
}

export class SendIdUserSuccess implements Action {
    readonly type = RecoveryPasswordActionTypes.SendIdUserSuccess;
}

export class SendIdUserError implements Action {
    readonly type = RecoveryPasswordActionTypes.SendIdUserError;
    constructor(public payload: { error: String }) { }
}

export class NextStep implements Action {
    readonly type = RecoveryPasswordActionTypes.NextStep;
}

export class SendRecoveryMethod implements Action {
    readonly type = RecoveryPasswordActionTypes.SendRecoveryMethod;
    constructor(public payload: { recoveryMethod: String, identificacion: String }) { }
}

export class SetEmailAndCelular implements Action {
    readonly type = RecoveryPasswordActionTypes.SetEmailAndCelular;
    constructor(public payload: methodsRecovery[]) { }
}


export type actions = OpenRecoveryPassword |
    CloseRecoveryPassword |
    SendIdUser |
    SendIdUserSuccess |
    SendIdUserError |
    NextStep |
    SendRecoveryMethod |
    SetEmailAndCelular;



