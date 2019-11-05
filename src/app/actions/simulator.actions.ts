import { Action } from '@ngrx/store';
import { actions } from './auth.actions';
import { ISimulator, IPreApplication } from '../models/credits.model';

// SIMULATION
export enum SimulationActionTypes {
    SendSimulation = '[SimulationAction] SEND_SIMULATION',
    SendSimulationRenewCredit = '[SimulationAction] SEND_SIMULATION_RENEW_CREDIT',

    ResetSimulation = '[SimulationAction] RESET_SIMULATION',

    SendSimulationSuccess = '[SimulationAction] SEND_SIMULATION_SUCCESS',
    SendSimulationError = '[SimulationAction] SEND_SIMULATION_ERROR',

    SendPreApplication = '[SimulationAction] SEND_PREAPPLICATION',
    SendPreApplicationSucess = '[SimulationAction] SEND_PREAPPLICATION_SUCCESS',
    SendPreApplicationError = '[SimulationAction] SEND_PREAPPLICATION_ERROR',
}


// SIMULATION
export class SendSimulation implements Action {
    readonly type = SimulationActionTypes.SendSimulation;
    constructor(public payload: ISimulator) { }
}

export class SendSimulationRenewCredit implements Action {
    readonly type = SimulationActionTypes.SendSimulationRenewCredit;
    constructor(public payload: any) { }
}


export class ResetSimulation implements Action {
    readonly type = SimulationActionTypes.ResetSimulation;
}




export class SendSimulationSuccess implements Action {
    readonly type = SimulationActionTypes.SendSimulationSuccess;
    constructor(public payload: any) { }
}

export class SendSimulationError implements Action {
    readonly type = SimulationActionTypes.SendSimulationError;
    constructor(public payload: any) { }
}



//PRE APPLICATION
// export class SendPreApplication implements Action {
//     readonly type = SimulationActionTypes.SendSimulationSuccess;
//     constructor(public payload: IPreApplication) { }
// }

// export class SendPreApplicationSucess implements Action {
//     readonly type = SimulationActionTypes.SendPreApplicationSucess;
//     constructor(public payload: any) { }
// }

// export class SendPreApplicationError implements Action {
//     readonly type = SimulationActionTypes.SendPreApplicationError;
//     constructor(public payload: any) { }
// }




export type actions = SendSimulation |
    SendSimulationSuccess |
    SendSimulationError | SendSimulationRenewCredit | ResetSimulation;
    // SendPreApplication |
    // SendPreApplicationSucess |
    // SendPreApplicationError;


