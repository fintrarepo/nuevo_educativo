export interface ITabs {
    tab1SubTab1: ITab,
    tab1SubTab2: ITab,
    tab1SubTab3: ITab,
}

interface ITab {
    active: boolean;
    disabled: boolean;
}



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


export interface ITab1SubTab2RequestData {
    tab: number,
    tabs_info: ITab1SubTab2,
    numero_solicitud: number,
    final: boolean
}



export interface ITab1SubTab2 {
    "actividad_economica": String,
    "ocupacion": String,
    "nombre_empresa": String,
    "nit": String,
    "cargo": String,
    "tipo_contrato": String,
    "fecha_ingreso": String,
    "direccion": String,
    "telefono": String,
    "email": String,
    "salario_ing": String,
    "comisiones_ing": String,
    "honorarios_ing": String,
    "arrendamientos_ing": String,
    "otros_ingresos": String,
    "total_activos": String,
    "arriendo_egr": String,
    "prestamo_xnomina": String,
    "total_pasivos": String
}




