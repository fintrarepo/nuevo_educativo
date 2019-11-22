import { Component, OnInit, NgZone } from '@angular/core';
import { Store } from '@ngrx/store';
import * as reducers from '../../reducers/reducers';
import { ToggleBlurPage, ShowOrHiddeApproved } from '../../actions/platform.actions';
import { UtilsService } from '../../services/utils/utils.service';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
import { NgbDateStruct, NgbCalendar, NgbDatepickerConfig, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

// getWeekday
@Component({
  selector: 'app-popup-approved',
  templateUrl: './popup-approved.component.html',
  styleUrls: ['./popup-approved.component.scss'],
  providers: [NgbDatepickerConfig]
})
export class PopupApprovedComponent implements OnInit {

  business;
  currentStep: number = 1;
  addressSelected;
  hourSelected;
  date: NgbDateStruct = null;
  public dateValid: boolean = false;
  minDate;
  dateSelected : boolean = false;

  constructor(private store: Store<reducers.State>,
    private utils: UtilsService,
    private router: Router,
    private calendar: NgbCalendar,
    private config: NgbDatepickerConfig,
    private zone : NgZone,
    private route: ActivatedRoute) {
    const date = moment().add("day", 1)
  
    this.minDate = new NgbDate(date.year(), (date.month() + 1), date.date())
  }

  ngOnInit() {
    this.config.showWeekdays = false;
    this.store.dispatch(new ToggleBlurPage())
  }

  nextStep() {
    this.currentStep++;
  }

  initStep() {
    this.currentStep = 2;
  }

  nextPage() {
    this.store.dispatch(new ToggleBlurPage())
    this.store.dispatch(new ShowOrHiddeApproved(false))
    this.router.navigate(['/app/upload/' + this.getBussinnes()])
  }

  cancel() {
    this.currentStep = -1;
  }

  cancelAndClose() {
    this.close()
    this.router.navigate(['/'])
  }

  close() {
    this.store.dispatch(new ToggleBlurPage())
    this.store.dispatch(new ShowOrHiddeApproved(false))
  }

  validateDate() {
    this.dateSelected = true;
    this.utils.validateDay(this.date).subscribe( data => {
      this.zone.run(()=>{
        this.dateValid = data[0].dia_habil == "t" ? true : false;
      })
    })
  }

  get isValidaDate(){
    return (!this.dateValid && this.dateSelected)
  }

  save() {
    this.business = this.getBussinnes()
    const data = { "num_solicitud": this.business, "place": this.addressSelected, "date": this.utils.buildDate(this.date), "hour": this.hourSelected }
    this.utils.saveVisit(data).subscribe(data => {
      this.nextStep()
    })
  }

  private getBussinnes() {
    let urlSplited = this.router.url.split('/')
    return urlSplited[urlSplited.length - 1]
  }
}
