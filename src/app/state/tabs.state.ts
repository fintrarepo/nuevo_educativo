import { ITab1SubTab1, ITab1SubTab2, ITabs } from '../models/tabs.model';


export const Tabs: ITabs = {
    tab1SubTab1: {
        active: false,
        disabled: false
    },
    tab1SubTab2: {
        active: false,
        disabled: false
    },
    tab1SubTab3: {
        active: false,
        disabled: false
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

// export const initialTab1SubTab1State: ITabs = {
//     active: true,
//     disabled: false,
//     title: "INFORMACIÓN PERSONAL",
//     id: "tab1-subtab1"
// }

// export const initialTab1SubTab2State: ITabs = {
//     active: false,
//     disabled: true,
//     title: "INFORMACIÓN LABORAL",
//     id: "tab1-subtab2"
// }


// export const initialTab1SubTab3State: ITabs = {
//     active: false,
//     disabled: true,
//     title: "REFERENCIAS",
//     id: "tab1-subtab3"
// }



// //TAB 2
// export const initialTab2State: ITabs = {
//     active: false,
//     disabled: true,
//     title: "INFORMACIÓN ESTUDIANTE",
//     id: "tab2"
// }



