export interface listFile {
    'option': number,
    'numero_solicitud': String,
    'user': String,
    'und_negocio': number,
    id_archivo?: number
}


export interface ISimulator {
    "monto": number,
    "num_cuotas": number,
    "fecha_pago": String,
    "id_convenio": number,
    "und_neg": number,
    "identificacion": number,
    error?: String,
    result?: any
}


export interface IPreApplication {
    "entidad": String,
    "afiliado": String,
    "monto": String,
    "producto": String,
    "num_cuotas": Number,
    "fecha_pago": String,
    "id_convenio": Number,
    "fecha_credito": String,
    "tipo_identificacion": String,
    "identificacion": String,
    "fecha_expedicion": String,
    "primer_nombre": String,
    "primer_apellido": String,
    "email": String,
    "ingresos_usuario": String,
    "fecha_nacimiento": String,
    "valor_cuota": any,
    "valor_aval": any,
    "empresa": String,
    "telefono": String,
    "tipo_cliente": String,
    "financia_aval": String,
    "login": String,
    "asesor": String,
    "und_neg": any,
    "departamento": String,
    "ciudad": String,
    "nit_empresa": String,
    "monto_renovacion": Number,
    "politica": String,
    "negocio_origen": String,
    "result": any,
    "error": any,
    "tipo_empleo": any
    
}