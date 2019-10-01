
import * as SimulationAction from '../actions/credit.actions';
import { PreApplicationActionTypes, SendPreApplicationError } from '../actions/credit.actions';
import { IPreApplication } from '../models/credits.model';

export { IPreApplication as State };


const initialStatePreApplication: IPreApplication = {
    "entidad": "",
    "afiliado": "",
    "monto": "",
    "producto": "",
    "num_cuotas": "",
    "fecha_pago": "",
    "id_convenio": "",
    "fecha_credito": "",
    "tipo_identificacion": "",
    "identificacion": "",
    "fecha_expedicion": "",
    "primer_nombre": "",
    "primer_apellido": "",
    "email": "",
    "ingresos_usuario": "",
    "fecha_nacimiento": "",
    "valor_cuota": "",
    "valor_aval": "",
    "empresa": "",
    "telefono": "",
    "tipo_cliente": "",
    "financia_aval": "",
    "login": "",
    "asesor": "",
    "und_neg": "",
    "departamento": "",
    "ciudad": "",
    "nit_empresa": "",
    "monto_renovacion": "",
    "politica": "",
    "negocio_origen": "",
    "error": "",
    "result": ""
}


export function PreApplicationReducer(state: IPreApplication = initialStatePreApplication, action: SimulationAction.actions) {

    switch (action.type) {
        case PreApplicationActionTypes.SendPreApplication:
            return {
                ...action.payload
            };

        case PreApplicationActionTypes.SendPreApplicationSucess:
            return {
                ...state,
                result: action.payload
            };

        case PreApplicationActionTypes.SendPreApplicationError:
            return {
                ...state,
                error: action.payload
            };


        default:
            return state;
    }

}


