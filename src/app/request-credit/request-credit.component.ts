import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../services/utils/utils.service';
import { CreditsService } from '../services/credits/credits.service';

@Component({
  selector: 'app-request-credit',
  templateUrl: './request-credit.component.html',
  styleUrls: ['./request-credit.component.scss']
})
export class RequestCreditComponent implements OnInit {
  currentStep = 1;
  currentSubStep = 1;

  spaces: boolean = false;

  polite: boolean = false;
  terms: boolean = false;

  cities: any[] = [];
  afiliates: any[] = [];
  dues: any[] = [];
  dates: any[] = [];
  valor_cuota;
  valor_aval;
  showModal: boolean = false;

  form = {

    primer_nombre: "",
    telefono: null,
    email: "",

    fecha_pago: "",
    ciudad: "",
    afiliado: "",
    num_cuotas: null,
    tipo_carrera: "",
    monto: null,

    primer_apellido: "",
    identificacion: ""
  }

  changeFormStudent: boolean = false;
  changeFormDataCredit: boolean = false;

  constructor(public utils: UtilsService, private credit: CreditsService) { }

  ngOnInit() {
    console.log('Test')
    this.loadCitys()
    this.dates = this.utils.carcularFecha()
  }




  firstStepSend() {
    this.currentSubStep = 2;


  }


  simulate() {


    this.credit.saveSimulation({
      primer_nombre: this.form.primer_nombre,
      telefono: this.form.telefono,
      email: this.form.email,
      monto: this.form.monto.replace(/,/g, ""),
      fecha_pago: this.form.fecha_pago,
      num_cuotas: this.form.num_cuotas
    })
      .subscribe(reponse => {
        console.log('SAVED SIMULATION')
      });


    this.credit.simulateNotToken({
      "monto": this.form.monto.replace(/,/g, ""),
      "num_cuotas": parseInt(this.form.num_cuotas),
      "fecha_pago": this.form.fecha_pago,
      "id_convenio": 58,
      "und_neg": 31,
      "identificacion": 0
    })
      .subscribe(response => {
        this.valor_cuota = response.valor_cuota
        this.valor_aval = response.valor_aval
        if (this.valor_cuota <= 100000) {
          alert('Lo sentimos, la cuota mensual debe ser mayor a $100.000')
          return;
        }
        this.currentSubStep = 3;
      })
  }



  loadAfiliates() {
    this.utils
      .loadAfiliates(this.form.ciudad)
      .subscribe(afiliates => {
        this.afiliates = afiliates.data;
        console.log(this.afiliates)
      })
  }

  requestCredit() {
    this.credit.clientExists(this.form.identificacion)
      .subscribe(response => {
        console.log(response.escliente)
        if (response.escliente == true) {
          this.currentStep = 3;
          this.currentSubStep = 1;
        } else {
          this.queryDataCredit()
        }
      })

  }

  queryDataCredit() {
    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var fecha_credito = d.getFullYear() + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day + " " + "00:00:00";
    this.credit.send2({
      entidad: "EDUCATIVO",
      afiliado: this.form.afiliado,
      monto: this.form.monto.replace(/,/g, ""),
      producto: "01",
      num_cuotas: this.form.num_cuotas,
      fecha_pago: this.form.fecha_pago,
      id_convenio: "58",
      fecha_credito: fecha_credito,
      tipo_identificacion: "CED",
      identificacion: this.form.identificacion,
      fecha_expedicion: "",
      primer_nombre: this.form.primer_nombre,
      primer_apellido: this.form.primer_apellido,
      email: this.form.email,
      ingresos_usuario: 0,
      fecha_nacimiento: "",
      valor_cuota: this.valor_cuota,//Falta esto
      valor_aval: this.valor_aval,//Falta esto
      empresa: "FINTRA",
      telefono: this.form.telefono,
      tipo_cliente: "",
      financia_aval: "f",
      und_neg: "31",
      ciudad: this.form.ciudad,
      nit_empresa: "8020220161",
      monto_renovacion: "0",
      politica: "",
      negocio_origen: "",
      tipo_carrera: this.form.tipo_carrera
    }).subscribe(response => {
      console.log(response)
      if (response.data.estado_sol == 'P') {
        this.currentStep = 3;
        this.currentSubStep = 2;
      } else {
        this.currentStep = 3;
        this.currentSubStep = 3;
      }
    }, err => {
      this.currentStep = 3;
      this.currentSubStep = 3;
    })


  }


  getNameAfiliafo(id) {
    return this.afiliates.filter(x => x.nit_afiliado == id)[0].nombre_afiliado
  }

  getNameCity(id) {
    return this.cities.filter(x => x.codigo == id)[0].ciudad
  }

  buildDues() {
    let currentAffiliate = this.afiliates.filter(x => x.nit_afiliado == this.form.afiliado)[0]
    let cuotaInicial = currentAffiliate.cuota_inicial
    let cuotaFinal = currentAffiliate.cuota_final
    if (this.form.tipo_carrera == 'POSGRADO') {
      cuotaInicial = 6;
      cuotaFinal = 18;

      const monto = this.form.monto.replace(/,/g, "");
      cuotaInicial = 6;
      if (monto >= 0 && monto <= 5000000) {
        cuotaFinal = 12;
      } else if (monto > 5000000 && monto <= 10000000) {
        cuotaFinal = 18;
      } else if (monto > 10000000 && monto <= 20000000) {
        cuotaFinal = 24;
      } else if (monto > 20000000) {
        cuotaFinal = 36;
      }
    } else if (this.form.tipo_carrera == 'CONTINUADA') {
      cuotaFinal = 4;
      cuotaInicial = 4;
    }
    this.dues = this.buildArrayDues(cuotaInicial, cuotaFinal)
  }

  validateSpaces() {
    this.spaces = false;
    const name = this.form.primer_nombre;
    for (var i = 0; i < name.length; i++) {
      if (name[i] == " ") {
        this.spaces = true;
        break;
      }
    }
  }

  changePolite() {
    this.changeFormStudent = true;
  }

  changeTerms(){
    this.changeFormDataCredit = true;
  }

  currency() {
    this.form.monto =
      this.form.monto
        .replace(/,/g, "")
        .toString()
        .replace(/[^0-9]/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")


  }

  private loadCitys() {
    this.utils.loadCitys()
      .subscribe(response => {
        this.cities = response
      })
  }

  private buildArrayDues(initial, final) {
    let arrayDues = [];

    for (var i = initial; i <= final; i++) {
      arrayDues.push(parseInt(i))
    }
    return arrayDues;
  }

}
