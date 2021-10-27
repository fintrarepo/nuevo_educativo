import { ITab1SubTab1, ITab1SubTab2, ITabs, ITab1SubTab3 } from '../models/tabs.model';


export const Tabs: ITabs = {
    tab1: {
        active: false,
        disabled: false
    },
    tab2: {
        active: false,
        disabled: true
    },
    tab1SubTab1: {
        active: false,
        disabled: true
    },
    tab1SubTab2: {
        active: false,
        disabled: true
    },
    tab1SubTab3: {
        active: false,
        disabled: true
    },


    tab2SubTab1: {
        active: false,
        disabled: true
    },
    tab2SubTab2: {
        active: false,
        disabled: true
    }
}

//TAB 1
export const initialTab1State: ITab1SubTab1 = {
    "primer_nombre": "",
    "segundo_nombre": "",
    "primer_apellido": "",
    "segundo_apellido": "",
    "genero": "",
    "estado_civil": "",
    "tipo_id": "",
    "identificacion": "",
    "fecha_expedicion_id": "",
    "dpto_expedicion_id": "",
    "ciudad_expedicion_id": "",
    "fecha_nacimiento": "",
    "dpto_nacimiento": "",
    "ciudad_nacimiento": "",
    "telefono": "",
    "email": "",
    "celular": "",
    "direccion": "",
    "barrio": "",
    "tipo_vivienda": "",
    "estrato": null,
    "posee_bienes": "",
    "nivel_estudio": "",
    "estado_civil_padres": "",
    "tiempo_residencia": ""
}

export const initialTab1SubTab2State: ITab1SubTab2 = {
    "actividad_economica": "",
    "ocupacion": "",
    "nombre_empresa": "",
    "nit": "",
    "cargo": "",
    "tipo_contrato": "",
    "fecha_ingreso": "",
    "direccion": "",
    "telefono": "",
    "email": "",
    "salario_ing": "",
    "comisiones_ing": "",
    "honorarios_ing": "",
    "arrendamientos_ing": "",
    "otros_ingresos": "",
    "total_activos": "",
    "arriendo_egr": "",
    "prestamo_xnomina": "",
    "total_pasivos": ""
}



export const initialTab1SubTab3State: ITab1SubTab3 = {

    "tipo_referencia": "",
    "secuencia": null,
    "primer_apellido": "",
    "segundo_apellido": "",
    "primer_nombre": "",
    "segundo_nombre": "",
    "parentesco": "",
    "telefono1": null,
    "celular": null
}




export const initialTab2SubTab1 = {

    "tipo_id": "",
    "identificacion": "",
    "fecha_expedicion_id": "",
    "dpto_expedicion_id": "",
    "ciudad_expedicion_id": "",
    "primer_apellido": "",
    "segundo_apellido": "",
    "primer_nombre": "",
    "segundo_nombre": "",
    "fecha_nacimiento": "",
    "dpto_nacimiento": "",
    "ciudad_nacimiento": "",
    "estado_civil": "",
    "nivel_estudio": "",
    "profesion": "",
    "genero": "",
    "direccion": "",
    "departamento": "",
    "ciudad": "",
    "tipo_via": "",
    "via_principal": "",
    "via_secundaria": "",
    "numero": "",
    "complemento": "",
    "barrio": "",
    "estrato": null,
    "tipo_vivienda": "",
    "tiempo_residencia": "",
    "telefono": "",
    "estado_civil_padres": "",
    "celular": "",
    "email": "",
    "universidad": "",
    "tipo_carrera": "",
    "programa": "",
    "codigo": "",
    "semestre": null,
    "parentesco_girador": "",
    "colegio_bachillerato": "",
    "nivel_educativo_padre": "",
    "sisben": "",
    "trabaja": ""
}
