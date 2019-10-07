export interface ITab1SubTab1 {
    "primer_nombre": String,
    "segundo_nombre": String,
    "primer_apellido": String,
    "segundo_apellido": String,
    "genero": String,
    "estado_civil": String,
    "tipo_id": String,
    "identificacion": String,
    "fecha_expedicion_id": String,
    "dpto_expedicion_id": String,
    "ciudad_expedicion_id": String,
    "fecha_nacimiento": String,
    "dpto_nacimiento": String,
    "ciudad_nacimiento": String,
    "telefono": String,
    "email": String,
    "celular": String,
    "direccion": String,
    "barrio": String,
    "tipo_vivienda": String,
    "estrato": number,
    "posee_bienes": String,
    "nivel_estudio": String,
    "estado_civil_padres": String,
    "tiempo_residencia": String
}

export interface ITab1SubTab1RequestData {
    tab: number,
    tabs_info: ITab1SubTab1,
    numero_solicitud: number,
    final: boolean
}


