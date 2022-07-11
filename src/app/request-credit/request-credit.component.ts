import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../services/utils/utils.service';
import { CreditsService } from '../services/credits/credits.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-request-credit',
  templateUrl: './request-credit.component.html',
  styleUrls: ['./request-credit.component.scss']
})
export class RequestCreditComponent implements OnInit {
  messageLoading: string;
  
  formPresolicitud: FormGroup;
  formPresolicitud2: FormGroup;
  formPresolicitud3: FormGroup;

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
  valor_salario;
  valor_cuota;
  valor_aval;
  showModal: boolean = false;

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
  occupations: any;
  invalidCc: boolean = false;
  errorSimulation: boolean = false;
  isLoading2: boolean = false;
  configSelect;
  aplicaValidacionEntidad: boolean=false;
  entidad: string="";
  universidad: string;

  constructor(
    public utils: UtilsService,
    private credit: CreditsService,
    private route: ActivatedRoute,
    private router:Router,
    private fb: FormBuilder) {
    this.referred = this.route.snapshot.queryParamMap.get('referido');
    this.universidad = this.route.snapshot.queryParamMap.get('universidad');
      // alert(this.universidad )
    this.formPresolicitud = this.fb.group({
      primer_nombre: ["", [Validators.required, Validators.pattern('^[a-zA-Z \u00f1\u00d1]*$')]],
      telefono: [null, [Validators.required, Validators.max(9999999999), Validators.min(999999999)]],
      email: ["", [Validators.required, Validators.email]]
    });

    this.formPresolicitud2 = this.fb.group({
      fecha_pago: ["", Validators.required],
      ciudad: ["", Validators.required],
      afiliado: ["", Validators.required],
      num_cuotas: [null, Validators.required],
      tipo_carrera: ["", Validators.required],
      monto: [null, Validators.required],
      polite: ['', Validators.requiredTrue],
      clausula: ['', Validators.requiredTrue],
      id_prospecto: ['', Validators.required]
    });

    this.formPresolicitud3 = this.fb.group({
      ocupacion: ["", Validators.required],
      primer_apellido: ["",  [Validators.required, Validators.pattern('^[a-zA-Z \u00f1\u00d1]*$')]],
      identificacion: [null, [Validators.required, Validators.max(9999999999), Validators.min(99999)]],
      ingresos: [null, [Validators.required]],
      term: ["", Validators.requiredTrue],
      sala: [null, Validators.required]
    }, { validator: this.checkSalary });
  }

  ngOnInit() {
    console.log(location.href)
    this.loadOccupations()
    this.loadCitys()
    this.loadSalary()
    this.dates = this.utils.carcularFecha();
    this.txtSend = document.getElementById('txtSend');
    this.iFrame = document.getElementById('iFrame');
    this.iFrameContainer = document.getElementById('iFrameContainer');
    this.utils.getAplicaReconocer().subscribe(res => {
      if(res.status==200){
        if((res.data.aplica=="SI") &&(res.data.entidad=="RECONOSER")){
          this.aplicaValidacionEntidad=true;
          this.entidad="RECONOSER";
        }else{
          this.aplicaValidacionEntidad=false;
        }
      }
    })
    this.auth = {
      clientId: "FINTRA",
      clientSecret: "Me@uB@!E44CQ%EAP"
    };

    this.validacion = {
      guidConv: "7aacec4f-2f02-4901-81f8-1d5772653434",
      tipoValidacion: "1",
      asesor: "Fintra",
      sede: "344889",
      tipoDoc: "CC",
      numDoc: "",
      email: "",
      celular: "",
      usuario: "Fintra",
      clave: "Fintra.2021*"
    }

    this.configSelect = {
      searchOnKey: 'nombre_afiliado',
      searchPlaceholder: 'Buscar',
      moreText: 'Solo se puede seleccionar una universidad',
      height: 'auto',
      placeholder: 'Selecciona la universidad',
      search: true,
      displayKey: 'nombre_afiliado',
      limitTo: 50,
      noResultsFound: 'no se encontro ningun resultado'
  };

    window.onmessage = async (event) => {
      if (event.data.for === "resultData") {
        // alert("Proceso terminado, Estado:" + event.data.isSuccess);
        this.iFrameContainer.classList.add('hide');
        this.iFrameContainer.classList.remove('show');
        if (event.data.isSuccess) {
          await this.ConsultarValidacion("https://recidaw.olimpiait.com/Validacion/ConsultarValidacion", this.token).then((resp: any) => {
            if (resp && resp.code == 200) {
              const data = resp.data;
              this.saveReconocerID(data).subscribe(resp => {
                if (resp.data === 'OK') {
                  this.messageLoading = 'Estamos generando tu solicitud';
                  this.queryDataCredit()
                  // this.credit.checkStatusReconoser(this.formPresolicitud2.value.id_prospecto)
                  //   .subscribe(response => {
                  //     if (response.aprobo) {
                  //     } else {
                  //       this.loadingRequest = false;
                  //       this.currentStep = 3;
                  //       this.currentSubStep = 3;
                  //       this.sendError('No aprobado.')
                  //     }
                  //   }, err => {
                  //     this.loadingRequest = false;
                  //     this.currentStep = 3;
                  //     this.currentSubStep = 4;
                  //     this.sendError('Interna.')
                  //   });
                }
              }, err => {
                this.loadingRequest = false;
                this.currentStep = 3;
                this.currentSubStep = 4;
                this.sendError('Interna.')
                this.isLoading2 = false;
              })
            }
          }).catch(err => {
            this.isLoading2 = false;
            this.sendError('con Reconoser ID (Validación de identidad).')
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
    return this.credit.saveReconocerID({ "identificacion": this.formPresolicitud3.value.identificacion, "id_prospecto": this.formPresolicitud2.value.id_prospecto, "json_resp": data, "tipo_trama": 1 })
  }


  firstStepSend() {
    this.isLoading2 = true;
    this.credit.saveSimulation({
      ...this.formPresolicitud.value,
      monto: 0,
      fecha_pago: "0100-01-01",
      num_cuotas: 0,
      paso: 1,
      cod_referido: this.referred ? this.referred : -100,
      agencia: "",
      afiliado: "",
      origen_solicitud: 'WEB',
      path:(this.universidad==null)||(this.universidad==undefined)?'':this.universidad
    })
      .subscribe(reponse => {
        this.formPresolicitud2.patchValue({ id_prospecto: reponse.id_prospecto })
        this.currentSubStep = 2;
        this.errorSimulation = false;
        this.isLoading2 = false;
      }, err => {
        this.isLoading2 = false;
        this.errorSimulation = true;
        this.sendError('Interna.')
      });


  }

  updatestate() {
    this.credit.updateStateSimulation({
      id_prospecto: this.formPresolicitud2.value.id_prospecto,
      estado_credito: "PR",
      subestado_credito: "PRI",
      numero_solicitud: ''
    })
      .subscribe(reponse => {
        console.log('Estado actualizado')
      }, err => {
        this.isLoading2 = false;
        this.sendError('interna.')
      });
  }

  sendError(message: string) {
    this.credit.notifyError({
      id_prospecto: this.formPresolicitud2.value.id_prospecto,
      unidad: 31,
      "cod-solicitud": '',
      correo: this.formPresolicitud.value.email,
      celular: this.formPresolicitud.value.telefono,
      nombres: this.formPresolicitud.value.primer_nombre + ' ' + this.formPresolicitud3.value.primer_apellido,
      cedula: this.formPresolicitud3.value.identificacion,
      info: "error de comunicación " + message //
    })
      .subscribe(reponse => {
        console.log('SEND NOTIFICATION')
      });
  }
 
  simulate() {
    this.errorSimulation = false;
    this.isLoading2 = true;

    if (this.formPresolicitud2.invalid) {
      return;
    }


    this.credit.updateSimulation({
      ...this.formPresolicitud.value,
      monto: this.formPresolicitud2.value.monto,
      fecha_pago: this.formPresolicitud2.value.fecha_pago,
      num_cuotas: this.formPresolicitud2.value.num_cuotas,
      paso: 2,
      id_prospecto: this.formPresolicitud2.value.id_prospecto,
      cod_referido: this.referred ? this.referred : -100,
      agencia: this.formPresolicitud2.value.ciudad,
      ocupacion: '',
      afiliado: this.formPresolicitud2.value.afiliado.nit_afiliado
    })
      .subscribe(reponse => {
        console.log('SAVED SIMULATION')
        history.pushState(null, '', 'pasoAntesPreaprobado');
        // alert("hola");
        this.credit.simulateNotToken({
          "monto": this.formPresolicitud2.value.monto, // .replace(/,/g, ""),
          "num_cuotas": parseInt(this.formPresolicitud2.value.num_cuotas),
          "fecha_pago": this.formPresolicitud2.value.fecha_pago,
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
            this.isLoading2 = false;
          }, err => {
            this.errorSimulation = true;
            this.isLoading2 = false;
            this.sendError('interna.')
          })
      }, err => {
        this.errorSimulation = true;
        this.isLoading2 = false;
        this.sendError('interna.')
      });
  }



  loadAfiliates() {
    this.utils
      .loadAfiliates(this.formPresolicitud2.value.ciudad)
      .subscribe(afiliates => {
        this.afiliates = afiliates.data;
      })
  }

  requestCredit() {
    this.credit.clientExists(this.formPresolicitud3.value.identificacion)
      .subscribe(response => {
        if (response.escliente == true) {
          this.currentStep = 3;
          this.currentSubStep = 1;
        } else {
          this.queryDataCredit()
          //this.runValidation();
        }
      }, err => {

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
      afiliado: this.formPresolicitud2.value.afiliado.nit_afiliado,
      monto: this.formPresolicitud2.value.monto, //.replace(/,/g, ""),
      producto: "01",
      num_cuotas: this.formPresolicitud2.value.num_cuotas,
      fecha_pago: this.formPresolicitud2.value.fecha_pago,
      id_convenio: "58",
      fecha_credito: fecha_credito,
      tipo_identificacion: "CED",
      identificacion: this.formPresolicitud3.value.identificacion,
      fecha_expedicion: "",
      primer_nombre: this.formPresolicitud.value.primer_nombre,
      primer_apellido: this.formPresolicitud3.value.primer_apellido,
      email: this.formPresolicitud.value.email,
      ingresos_usuario: this.formPresolicitud3.value.ingresos, //.replace(/,/g, ""),
      fecha_nacimiento: "",
      valor_cuota: this.valor_cuota,//Falta esto
      valor_aval: this.valor_aval,//Falta esto
      empresa: "FINTRA",
      telefono: this.formPresolicitud.value.telefono,
      tipo_cliente: "",
      financia_aval: "f",
      und_neg: "31",
      ciudad: this.formPresolicitud2.value.ciudad,
      nit_empresa: "8020220161",
      monto_renovacion: "0",
      politica: "",
      negocio_origen: "",
      tipo_carrera: this.formPresolicitud2.value.tipo_carrera,
      tipo_empleo: this.formPresolicitud3.value.ocupacion,
      id_prospecto: this.formPresolicitud2.value.id_prospecto,
      origen_solicitud: 'WEB'
    }

    if (this.referred) {
      dataToSend['referido'] = this.referred;
    }
    this.credit.send2(dataToSend).subscribe(response => {
    
      this.loadingRequest = false;
      if (response.data.estado_sol == 'P') {
        // alert("Hola");
        this.router.navigate(['preaprobado']);   
        this.currentStep = 3;
        this.currentSubStep = 2;
      } else {
        this.messageError = response.data.msg
        this.currentStep = 3;
        this.currentSubStep = 3;
      }
    }, err => {
      this.isLoading2 = false;
      this.sendError('Interna.')
      if (err.error.detail.msg) {
        this.messageError = err.error.detail.msg;
      } else {
        this.messageError = err.error.detail;
      }
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
    let currentAffiliate = this.afiliates.filter(x => x.nit_afiliado == this.formPresolicitud2.value.afiliado.nit_afiliado)[0]
    let cuotaInicial = currentAffiliate.cuota_inicial
    let cuotaFinal = currentAffiliate.cuota_final
    if (this.formPresolicitud2.value.tipo_carrera == 'POSGRADO') {
      cuotaInicial = 6;
      cuotaFinal = 18;

      const monto = this.formPresolicitud2.value.monto; //.replace(/,/g, "");
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
    } else if (this.formPresolicitud2.value.tipo_carrera == 'CONTINUADA') {
      cuotaFinal = 4;
      cuotaInicial = 4;
    }
    console.log('INICIAL', cuotaInicial );
    console.log('FINAL', cuotaFinal );
    
    this.dues = this.buildArrayDues(cuotaInicial, cuotaFinal)
  }

  validateSpaces() {
    this.spaces = false;
    const name = this.formPresolicitud.value.primer_nombre;
    for (var i = 0; i < name.length; i++) {
      if (name[i] == " ") {
        this.spaces = true;
        break;
      }
    }
  }

  checkCredit() {
    this.isLoading2 = true;
    this.loadingRequest = true;
    this.invalidCc = false;
    this.messageLoading = 'Iniciaremos tu validación de identidad';
    this.credit.checkCredic(this.formPresolicitud3.value.identificacion).subscribe(resp => {
      if (resp.success) {
        if (resp.data.option == 2) {
          this.validarentidad();
        } else {
          this.currentStep = 3;
          this.currentSubStep = 1;
        }
      } else {
        this.validarentidad();
      }
    },
      err => {
        this.sendError('interna.')
        this.loadingRequest = false;
        this.isLoading2 = false;
        this.currentStep = 3;
        this.currentSubStep = 4;
      })
  }
  validarentidad(){
    if(this.aplicaValidacionEntidad){
      switch (this.entidad) {
        case 'RECONOSER':
          this.runValidation();
        break;
      
        default:
          this.messageLoading = 'Estamos generando tu solicitud';
          this.queryDataCredit()
        break;
      }
    }else{
      this.messageLoading = 'Estamos generando tu solicitud';
      this.queryDataCredit()
    }
  }

  async runValidation() {
    this.invalidCc = false;
    this.validacion = { ...this.validacion, celular: this.formPresolicitud.value.telefono, numDoc: this.formPresolicitud3.value.identificacion.toString(), email: this.formPresolicitud.value.email, }

    let url;
    // debugger;
    // let url_prod="https://demorcs.olimpiait.com:6317/TraerToken"
    let url_prod="https://recidaw.olimpiait.com/TraerToken"
    await this.Post(url_prod, this.auth).then((resp: any) => {
      this.token = resp.accessToken;
    }).catch(err => {
      this.sendError('con Reconoser ID (Validación de identidad).')
      this.isLoading2 = false;
    });
    //SOLICITAR VALIDACIÓN
    await this.Post("https://recidaw.olimpiait.com/Validacion/SolicitudValidacion", this.validacion, this.token).then((resp: any) => {
      if (resp && resp.code == 200) {
        this.messageLoading = 'Estamos validando tu identidad';
        this.updatestate();
        url = resp.data.url;
        this.procesoConvenioGuid = resp.data.procesoConvenioGuid
      }
    })
      .catch(err => {
        this.isLoading2 = false;
        this.invalidCc = true;
        this.loadingRequest = false;
        this.sendError('con Reconoser ID (Validación de identidad).')
      });
    if (url) {
      this.iFrame.src = url;
      this.iFrameContainer.classList.remove('hide');
      this.iFrameContainer.classList.add('show');
    }

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
      "clave": "Fintra.2021*"
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
    this.formPresolicitud3.value[control] =
      this.formPresolicitud3.value[control]
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
  private loadSalary() {
    this.utils.getSalary()
      .subscribe(response => {
        this.formPresolicitud3.patchValue({
          sala: response.salario_minimo_mensual
        });
      })
  }

  private loadOccupations() {
    this.credit.loadOccupation()
      .subscribe(response => {
        this.occupations = response
      })
  }

  private buildArrayDues(initial, final) {
    let arrayDues = [];

    for (var i = initial; i <= final; i++) {
      arrayDues.push(parseInt(i))
    }
    return arrayDues;
  }

  checkSalary(group: FormGroup) {
    const salario = group.controls.ingresos.value;
    const salarioMin = group.controls.sala.value;
    if (salario !== '' && salario < salarioMin) {
      group.controls.ingresos.setErrors({ notMayor: true });
    } else {
      group.controls.ingresos.setErrors(null);
    }
  }
}
