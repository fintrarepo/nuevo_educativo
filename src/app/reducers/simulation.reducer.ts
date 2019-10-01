import * as SimulationAction from '../actions/simulator.actions';
import { SimulationActionTypes, SendSimulationSuccess, SendSimulationError, SendPreApplication } from '../actions/simulator.actions';
import { ISimulator } from '../models/credits.model';

export { ISimulator as State };



const initialState: ISimulator = {
    fecha_pago: "",
    id_convenio: null,
    identificacion: null,
    monto: null,
    num_cuotas: null,
    und_neg: null,
    error: "",
    result: null
}

export function SimulatorReducer(state: ISimulator = initialState, action: SimulationAction.actions) {

    switch (action.type) {
        case SimulationActionTypes.SendSimulation:
            return {
                ...action.payload,
                result: null
            };

        case SimulationActionTypes.SendSimulationSuccess:
            return {
                ...state,
                result: action.payload
            };

        case SimulationActionTypes.SendSimulationError:
            return {
                ...state,
                error: action.payload
            };


        default:
            return state;
    }

}


export const getSimulatorState = (state: ISimulator) => state;
export const getSimulatorSuccess = (state: ISimulator) => state.result;
export const getSimulatorError = (state: ISimulator) => state.error;



