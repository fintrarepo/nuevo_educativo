export interface ITabs {
    tab1: ITab,
    tab2: ITab,
    tab1SubTab1: ITab,
    tab1SubTab2: ITab,
    tab1SubTab3: ITab,

    tab2SubTab1: ITab,
    tab2SubTab2: ITab,
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





export interface ITab1SubTab3 {

    "tipo_referencia": String,
    "secuencia": number,
    "primer_apellido": String,
    "segundo_apellido": String,
    "primer_nombre": String,
    "segundo_nombre": String,
    "parentesco": String,
    "telefono1": String,
    "celular": String,
    "direccion": String,
    "departamento": String,
    "ciudad": String,
    "tipo_via": String,
    "via_principal": String,
    "via_secundaria": String,
    "numero": String,
    "complemento": String

}

export interface ITab1SubTab3RequestData {
    tab: number,
    tabs_info: ITab1SubTab3[],
    numero_solicitud: number,
    final: boolean
}


export interface ITab2SubTab1 {
    "tipo_id": String,
    "identificacion": String,
    "fecha_expedicion_id": String,
    "dpto_expedicion_id": String,
    "ciudad_expedicion_id": String,
    "primer_apellido": String,
    "segundo_apellido": String,
    "primer_nombre": String,
    "segundo_nombre": String,
    "fecha_nacimiento": String,
    "dpto_nacimiento": String,
    "ciudad_nacimiento": String,
    "estado_civil": String,
    "nivel_estudio": String,
    "profesion": String,
    "genero": String,
    "direccion": String,
    "departamento": String,
    "ciudad": String,
    "tipo_via": String,
    "via_principal": String,
    "via_secundaria": String,
    "numero": String,
    "complemento": String,
    "barrio": String,
    "estrato": number,
    "tipo_vivienda": String,
    "tiempo_residencia": String,
    "telefono": String,
    "estado_civil_padres": String,
    "celular": String,
    "email": String,
    "universidad": String,
    "tipo_carrera": String,
    "programa": String,
    "codigo": String,
    "semestre": number,
    "parentesco_girador": String,
    "colegio_bachillerato": String,
    "nivel_educativo_padre": String,
    "sisben": String,
    "trabaja": String
}



export interface ITab2SubTab1RequestData {
    tab: number,
    tabs_info: ITab2SubTab1,
    numero_solicitud: number,
    final: boolean
}






