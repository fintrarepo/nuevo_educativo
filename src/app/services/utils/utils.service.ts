import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private http: HttpService) { }


  loadCitys() {
    return this.http.post("/webresources/loans/cities", null)
  }

  loadAfiliates(city) {
    return this.http.post("/webresources/hdc/list_affiliates", { ciudad: city })
  }

  getNeighborhood(ciudad) {
    return this.http.post("/webresources/form/neighborhood", { ciudad })
  }

  loadJobs(cod_actividad) {
    return this.http.post('/webresources/form/job', { cod_actividad })
  }

  getAddress(cod_ciudad) {
    return this.http.post('/webresources/form/get_address', { cod_ciudad })
  }

  saveVisit(data) {
    return this.http.put('/webresources/form/save_visit', data)
  }

  getCurrentStep(data) {
    return this.http.post('/webresources/form/continue_tab', data)
  }

  buildDate(object) {
    if (!(object.year && object.month && object.day)) {
      return "";
    }

    let month = String(object.month).length == 1 ? "0" + String(object.month) : String(object.month)
    let day = String(object.day).length == 1 ? "0" + String(object.day) : object.day

    console.log(object.year + "-" + month + "-" + day)
    return object.year + "-" + month + "-" + day
  }

  carcularFecha(year?, mo?, day?) {
    var opcion0;
    var opcion1;
    var opcion2;
    var date;
    if (year) {
      date = new Date(year, mo, day);
    } else {
      date = new Date();
    }

    var days = date.getDate();
    var fecha = "0099-01-01";
    var mes = date.getMonth() + 1;
    var anio = date.getFullYear();



    if (days >= 1 && days <= 2) {

      if (mes === 12) {

        fecha = (anio + 1) + "-" + "01" + "-02";
        opcion0 = new Option(fecha, fecha,);
        fecha = (anio + 1) + "-" + "01" + "-12";
        opcion1 = new Option(fecha, fecha);
        fecha = (anio + 1) + "-" + "01" + "-17";
        opcion2 = new Option(fecha, fecha);
        // fecha = (anio + 1) + "-" + "01" + "-22";
        // opcion3 = new Option(fecha, fecha);


      } else {

        fecha = date.getFullYear() + "-" + ((date.getMonth() + 2) > 9 ? (date.getMonth() + 2) : "0" + (date.getMonth() + 2)) + "-02";
        opcion0 = new Option(fecha, fecha,);
        fecha = date.getFullYear() + "-" + ((date.getMonth() + 2) > 9 ? (date.getMonth() + 2) : "0" + (date.getMonth() + 2)) + "-12";
        opcion1 = new Option(fecha, fecha);
        fecha = date.getFullYear() + "-" + ((date.getMonth() + 2) > 9 ? (date.getMonth() + 2) : "0" + (date.getMonth() + 2)) + "-17";
        opcion2 = new Option(fecha, fecha);
        // fecha = date.getFullYear() + "-" + ((date.getMonth() + 2) > 9 ? (date.getMonth() + 2) : "0" + (date.getMonth() + 2)) + "-22";
        // opcion3 = new Option(fecha, fecha);


      }

    }

    if (days > 2 && days <= 12) {

      if (mes === 12) {

        fecha = (anio + 1) + "-" + "01" + "-12";
        opcion0 = new Option(fecha, fecha,);
        fecha = (anio + 1) + "-" + "01" + "-17";
        opcion1 = new Option(fecha, fecha);
        // fecha = (anio + 1) + "-" + "01" + "-22";
        // opcion2 = new Option(fecha, fecha);
        fecha = (anio + 1) + "-" + "02" + "-02";
        opcion2 = new Option(fecha, fecha);


      } else {

        fecha = date.getFullYear() + "-" + ((date.getMonth() + 2) > 9 ? (date.getMonth() + 2) : "0" + (date.getMonth() + 2)) + "-12";
        opcion0 = new Option(fecha, fecha,);
        fecha = date.getFullYear() + "-" + ((date.getMonth() + 2) > 9 ? (date.getMonth() + 2) : "0" + (date.getMonth() + 2)) + "-17";
        opcion1 = new Option(fecha, fecha);
        // fecha = date.getFullYear() + "-" + ((date.getMonth() + 2) > 9 ? (date.getMonth() + 2) : "0" + (date.getMonth() + 2)) + "-22";
        // opcion2 = new Option(fecha, fecha);
        if (mes === 11) {
          fecha = (anio + 1) + "-" + "01" + "-02";
          opcion2 = new Option(fecha, fecha);
        } else {
          fecha = date.getFullYear() + "-" + ((date.getMonth() + 3) > 9 ? (date.getMonth() + 3) : "0" + (date.getMonth() + 3)) + "-02";
          opcion2 = new Option(fecha, fecha);
        }

      }
    }

    if (days > 12 && days <= 17) {

      if (mes === 12) {

        fecha = (anio + 1) + "-" + "01" + "-17";
        opcion0 = new Option(fecha, fecha,);
        // fecha = (anio + 1) + "-" + "01" + "-22";
        // opcion1 = new Option(fecha, fecha);
        fecha = (anio + 1) + "-" + "02" + "-02";
        opcion1 = new Option(fecha, fecha);
        fecha = (anio + 1) + "-" + "02" + "-12";
        opcion2 = new Option(fecha, fecha);


      } else {
        fecha = date.getFullYear() + "-" + ((date.getMonth() + 2) > 9 ? (date.getMonth() + 2) : "0" + (date.getMonth() + 2)) + "-17";
        opcion0 = new Option(fecha, fecha,);
        // fecha = date.getFullYear() + "-" + ((date.getMonth() + 2) > 9 ? (date.getMonth() + 2) : "0" + (date.getMonth() + 2)) + "-22";
        // opcion1 = new Option(fecha, fecha);

        if (mes === 11) {

          fecha = (anio + 1) + "-" + "01" + "-02";
          opcion1 = new Option(fecha, fecha);
          fecha = (anio + 1) + "-" + "01" + "-12";
          opcion2 = new Option(fecha, fecha);

        } else {

          fecha = date.getFullYear() + "-" + ((date.getMonth() + 3) > 9 ? (date.getMonth() + 3) : "0" + (date.getMonth() + 3)) + "-02";
          opcion1 = new Option(fecha, fecha);
          fecha = date.getFullYear() + "-" + ((date.getMonth() + 3) > 9 ? (date.getMonth() + 3) : "0" + (date.getMonth() + 3)) + "-12";
          opcion2 = new Option(fecha, fecha);
        }
      }

    }

    if (days > 17 && days <= 22) {

      if (mes === 12) {

        // fecha = (anio + 1) + "-" + "01" + "-22";
        // opcion0 = new Option(fecha, fecha,);
        fecha = (anio + 1) + "-" + "02" + "-02";
        opcion0 = new Option(fecha, fecha);
        fecha = (anio + 1) + "-" + "02" + "-12";
        opcion1 = new Option(fecha, fecha);
        fecha = (anio + 1) + "-" + "02" + "-17";
        opcion2 = new Option(fecha, fecha);


      } else {

        // fecha = date.getFullYear() + "-" + ((date.getMonth() + 2) > 9 ? (date.getMonth() + 2) : "0" + (date.getMonth() + 2)) + "-22";
        // opcion0 = new Option(fecha, fecha,);

        if (mes === 11) {

          fecha = (anio + 1) + "-" + "01" + "-02";
          opcion0 = new Option(fecha, fecha);
          fecha = (anio + 1) + "-" + "01" + "-12";
          opcion1 = new Option(fecha, fecha);
          fecha = (anio + 1) + "-" + "01" + "-17";
          opcion2 = new Option(fecha, fecha);

        } else {

          fecha = date.getFullYear() + "-" + ((date.getMonth() + 3) > 9 ? (date.getMonth() + 3) : "0" + (date.getMonth() + 3)) + "-02";
          opcion0 = new Option(fecha, fecha);
          fecha = date.getFullYear() + "-" + ((date.getMonth() + 3) > 9 ? (date.getMonth() + 3) : "0" + (date.getMonth() + 3)) + "-12";
          opcion1 = new Option(fecha, fecha);
          fecha = date.getFullYear() + "-" + ((date.getMonth() + 3) > 9 ? (date.getMonth() + 3) : "0" + (date.getMonth() + 3)) + "-17";
          opcion2 = new Option(fecha, fecha);
        }
      }

    }


    if (days > 22 && days <= 31) {

      if (mes === 12) {

        fecha = (anio + 1) + "-" + "02" + "-02";
        opcion0 = new Option(fecha, fecha,);
        fecha = (anio + 1) + "-" + "02" + "-12";
        opcion1 = new Option(fecha, fecha);
        fecha = (anio + 1) + "-" + "02" + "-17";
        opcion2 = new Option(fecha, fecha);
        // fecha = (anio + 1) + "-" + "02" + "-22";
        // opcion3 = new Option(fecha, fecha);


      } else {

        if (mes === 11) {

          fecha = (anio + 1) + "-" + "01" + "-02";
          opcion0 = new Option(fecha, fecha,);
          fecha = (anio + 1) + "-" + "01" + "-12";
          opcion1 = new Option(fecha, fecha);
          fecha = (anio + 1) + "-" + "01" + "-17";
          opcion2 = new Option(fecha, fecha);
          // fecha = (anio + 1) + "-" + "01" + "-22";
          // opcion3 = new Option(fecha, fecha);


        } else {

          fecha = date.getFullYear() + "-" + ((date.getMonth() + 3) > 9 ? (date.getMonth() + 3) : "0" + (date.getMonth() + 3)) + "-02";
          opcion0 = new Option(fecha, fecha,);
          fecha = date.getFullYear() + "-" + ((date.getMonth() + 3) > 9 ? (date.getMonth() + 3) : "0" + (date.getMonth() + 3)) + "-12";
          opcion1 = new Option(fecha, fecha);
          fecha = date.getFullYear() + "-" + ((date.getMonth() + 3) > 9 ? (date.getMonth() + 3) : "0" + (date.getMonth() + 3)) + "-17";
          opcion2 = new Option(fecha, fecha);
          // fecha = date.getFullYear() + "-" + ((date.getMonth() + 3) > 9 ? (date.getMonth() + 3) : "0" + (date.getMonth() + 3)) + "-22";
          // opcion3 = new Option(fecha, fecha);

        }

      }
    }

    return [opcion0.value, opcion1.value, opcion2.value]

    // $('#diadepago').append(opcion0);
    // $('#diadepago').append(opcion1);
    // $('#diadepago').append(opcion2);
    // $('#diadepago').append(opcion3);
    //alert(opcion0+' '+opcion1+' '+opcion2+' '+opcion3)


  }
}
