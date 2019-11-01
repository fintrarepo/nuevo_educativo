import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as reducers from '../../reducers/reducers';
import { ToggleBlurPage, ShowOrHiddeApproved } from '../../actions/platform.actions';
import { UtilsService } from '../../services/utils/utils.service';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
import { NgbDateStruct, NgbCalendar, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

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
  date: NgbDateStruct;

  constructor(private store: Store<reducers.State>,
    private utils: UtilsService,
    private router: Router,
    private calendar: NgbCalendar,
    private config: NgbDatepickerConfig,
    private route: ActivatedRoute) {
    
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
