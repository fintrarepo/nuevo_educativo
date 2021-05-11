import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../services/utils/utils.service';
import { CreditsService } from '../services/credits/credits.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-request-credit',
  templateUrl: './request-credit.component.html',
  styleUrls: ['./request-credit.component.scss']
})
export class RequestCreditComponent implements OnInit {
  loadingRequest: boolean = false;
  currentStep = 1;
  currentSubStep = 1;
  messageError = "";
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
    ingresos: null,

    primer_apellido: "",
    identificacion: ""
  }

  changeFormStudent: boolean = false;
  changeFormDataCredit: boolean = false;
  referred;

  txtSend;
  iFrame;
  iFrameContainer;
  auth;
  validacion;
  procesoConvenioGuid;
  token;

  constructor(public utils: UtilsService, private credit: CreditsService, private route: ActivatedRoute) {
    this.referred = this.route.snapshot.queryParamMap.get('referido');


  }

  ngOnInit() {
    console.log('Test')
    this.loadCitys()
    this.dates = this.utils.carcularFecha();
    this.txtSend = document.getElementById('txtSend');
    this.iFrame = document.getElementById('iFrame');
    this.iFrameContainer = document.getElementById('iFrameContainer');
    this.auth = {
      clientId: "FINTRA",
      clientSecret: "F1ntr4P@$$w0rd"
    };

    this.validacion = {
      guidConv: "7aacec4f-2f02-4901-81f8-1d5772653434",
      tipoValidacion: "1",
      asesor: "Fintra",
      sede: "344889",
      tipoDoc: "CC",
      numDoc: "",
      email: "",
      celular: "3057671931",
      usuario: "Fintra",
      clave: "12345"
    }

    window.onmessage = async (event) => {
      console.log(`Received message: ${event.data}`, event.data);
      if (event.data.for === "resultData") {
        // alert("Proceso terminado, Estado:" + event.data.isSuccess);
        this.iFrameContainer.classList.add('hide');
        this.iFrameContainer.classList.remove('show');
        if (event.data.isSuccess) {
          // this.queryDataCredit()
          await this.ConsultarValidacion("https://demorcs.olimpiait.com:6314/Validacion/ConsultarValidacion", this.token).then((resp: any) => {
            if (resp && resp.code == 200) {
              const data = resp.data;
              this.saveReconocerID(data)
              // --(finalizado = TRUE and EstadoProceso = (1: enrolamiento) and cacelado =false) // Paso las validaciones de identidad  
              // --(finalizado = TRUE and EstadoProceso = (2: validacion) and cancelado =false and aprobado=true  ) // Pasa cliente enrolados previamente
              if (data.finalizado == true && data.estadoProceso == 1 && data.cancelado == false) {
                return this.queryDataCredit();
              }
              if (data.finalizado == true && data.estadoProceso == 2 && data.cancelado == false && data.aprobado == true) {
                return this.queryDataCredit();
              }

              this.loadingRequest = false;
              this.currentStep = 3;
              this.currentSubStep = 3;
            }
          });
        } else {
          this.saveReconocerID(event.data);
          this.loadingRequest = false;
          this.currentStep = 3;
          this.currentSubStep = 3;
        }
      }
    }
  }


  saveReconocerID(data) {
    this.credit.saveReconocerID(this.form.identificacion, data)
      .subscribe(data => {
        console.log('Saved reconocer ID');
      })
  }


  firstStepSend() {
    this.credit.saveSimulation({
      primer_nombre: this.form.primer_nombre,
      telefono: this.form.telefono,
      email: this.form.email,
      monto: 0,
      fecha_pago: "0100-01-01",
      num_cuotas: 0,
      paso: 1,
      cod_referido: this.referred ? this.referred : -100,
      agencia: "",
      afiliado: ""
    })
      .subscribe(reponse => {
        console.log('SAVED SIMULATION')
      });


    this.currentSubStep = 2;


  }


  simulate() {




    this.credit.saveSimulation({
      primer_nombre: this.form.primer_nombre,
      telefono: this.form.telefono,
      email: this.form.email,
      monto: this.form.monto.replace(/,/g, ""),
      ingresos: this.form.ingresos.replace(/,/g, ""),
      fecha_pago: this.form.fecha_pago,
      num_cuotas: this.form.num_cuotas,
      paso: 2,

      cod_referido: this.referred ? this.referred : -100,
      agencia: this.form.ciudad,
      afiliado: this.form.afiliado
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
          //this.runValidation();
        }
      })

  }

  queryDataCredit() {
    this.loadingRequest = true;
    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var fecha_credito = d.getFullYear() + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day + " " + "00:00:00";

    let dataToSend = {
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
    }

    if (this.referred) {
      dataToSend['referido'] = this.referred;
    }
    this.credit.send2(dataToSend).subscribe(response => {
      this.loadingRequest = false;
      console.log(response)
      if (response.data.estado_sol == 'P') {
        this.currentStep = 3;
        this.currentSubStep = 2;
      } else {
        this.currentStep = 3;
        this.currentSubStep = 3;
      }
    }, err => {
      this.messageError = err.error.detail
      this.loadingRequest = false;
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


  async runValidation() {
    this.loadingRequest = true;
    this.validacion = { ...this.validacion, numDoc: this.form.identificacion.toString(), email: this.form.email, }
    //this.validacion = {...this.validacion,  numDoc: "1143444600", email: "antoniojsh93@gmail.com" }
    // let token;
    let url;
    await this.Post("https://demorcs.olimpiait.com:6317/TraerToken", this.auth).then((resp: any) => {
      this.token = resp.accessToken;
    });
    //SOLICITAR VALIDACIÓN
    await this.Post("https://demorcs.olimpiait.com:6314/Validacion/SolicitudValidacion", this.validacion, this.token).then((resp: any) => {
      if (resp && resp.code == 200) {
        console.log(resp.data)
        url = resp.data.url;
        this.procesoConvenioGuid = resp.data.procesoConvenioGuid
      }
    });
    if (url) {
      this.iFrame.src = url;
      this.iFrameContainer.classList.remove('hide');
      this.iFrameContainer.classList.add('show');
    }
    console.log(url);

  }

  Post(url, dataRequest, token = "") {
    return new Promise(function (resolve, reject) {
      var request = new XMLHttpRequest();
      request.open('POST', url);
      if (token !== "") {
        request.setRequestHeader("Authorization", "Bearer " + token);
      };
      request.setRequestHeader('Content-type', 'application/json');
      request.responseType = 'json';
      request.onload = function () {
        if (request.status === 200) {
          resolve(request.response);
        } else {
          reject(Error('No fue posible hacer la verificación:' + request.statusText));
        }
      };
      request.onerror = function () {
        reject(Error('Ocurrio un error de red.'));
      };
      // Send the request
      request.send(JSON.stringify(dataRequest));
    });
  }

  ConsultarValidacion(url, token = "") {


    let data = {
      "guidConv": "7aacec4f-2f02-4901-81f8-1d5772653434",
      "procesoConvenioGuid": this.procesoConvenioGuid,
      "usuario": "Fintra",
      "clave": "12345"
    }

    return new Promise(function (resolve, reject) {
      var request = new XMLHttpRequest();
      request.open('POST', url);
      if (token !== "") {
        request.setRequestHeader("Authorization", "Bearer " + token);
      };
      request.setRequestHeader('Content-type', 'application/json');
      request.responseType = 'json';
      request.onload = function () {
        if (request.status === 200) {
          resolve(request.response);
        } else {
          reject(Error('No fue posible hacer la verificación:' + request.statusText));
        }
      };
      request.onerror = function () {
        reject(Error('Ocurrio un error de red.'));
      };
      // Send the request
      request.send(JSON.stringify(data));
    });
  }

  changePolite() {
    this.changeFormStudent = true;
  }

  changeTerms() {
    this.changeFormDataCredit = true;
  }

  currency(control) {
    this.form[control] =
      this.form[control]
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
