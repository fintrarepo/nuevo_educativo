
import * as SimulationAction from '../actions/credit.actions';
import { PreApplicationActionTypes, SendPreApplicationError, SendPreApplicationNotAproved } from '../actions/credit.actions';
import { IPreApplication } from '../models/credits.model';

export { IPreApplication as State };


const initialStatePreApplication: IPreApplication = {
    "entidad": "",
    "afiliado": "",
    "monto": "",
    "producto": "",
    "num_cuotas": 0,
    "fecha_pago": "",
    "id_convenio": 0,
    "fecha_credito": "",
    "tipo_identificacion": "",
    "identificacion": "",
    "fecha_expedicion": "",
    "primer_nombre": "",
    "primer_apellido": "",
    "email": "",
    "ingresos_usuario": "",
    "fecha_nacimiento": "",
    "valor_cuota": null,
    "valor_aval": null,
    "empresa": "",
    "telefono": "",
    "tipo_cliente": "",
    "financia_aval": "",
    "login": "",
    "asesor": "",
    "und_neg": null,
    "departamento": "",
    "ciudad": "",
    "nit_empresa": "",
    "monto_renovacion": 0,
    "politica": "",
    "negocio_origen": "",
    "error": "",
    "result": "",
    tipo_empleo: ""
}


export function PreApplicationReducer(state: IPreApplication = initialStatePreApplication, action: SimulationAction.actions) {

    switch (action.type) {
        case PreApplicationActionTypes.SendPreApplication:
            return {
                ...action.payload
            };

        case PreApplicationActionTypes.SendPreApplicationSucess:
            return {
                ...initialStatePreApplication
            };

        case PreApplicationActionTypes.SendPreApplicationError:
            return {
                ...state,
                error: action.payload
            };

        case PreApplicationActionTypes.SendPreApplicationNotAproved:
            return {
                ...initialStatePreApplication,
            };


        default:
            return state;
    }

}


