import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as reducers from '../../reducers/reducers';
import { ToggleBlurPage, ShowOrHiddeApproved } from '../../actions/platform.actions';
import { UtilsService } from '../../services/utils/utils.service';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';

@Component({
  selector: 'app-popup-approved',
  templateUrl: './popup-approved.component.html',
  styleUrls: ['./popup-approved.component.scss']
})
export class PopupApprovedComponent implements OnInit {

  business;
  currentStep: number = 1;
  addressSelected;
  hourSelected;
  date;

  constructor(private store: Store<reducers.State>,
    private utils: UtilsService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.store.dispatch(new ToggleBlurPage())
  }

  nextStep() {
    this.currentStep++;
  }

  nextPage() {
    this.store.dispatch(new ToggleBlurPage())
    this.store.dispatch(new ShowOrHiddeApproved(false))
    this.router.navigate(['/app/upload/' + this.getBussinnes()])
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
