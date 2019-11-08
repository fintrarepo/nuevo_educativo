import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { GetListRequest } from 'src/app/actions/list-requests.actions';
import { Store } from '@ngrx/store';
import * as reducers from '../../reducers/reducers';
import { CreditsService } from '../../services/credits/credits.service';
import { AuthService } from '../../services/auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  type_list: String;
  credits: boolean = false;
  historyc: any[] = [];
  identificacion= "";

  showLoadingHistory: boolean = false;
  historyIsLoaded: boolean = false;
  routerSubscription: any;

  constructor(private route: ActivatedRoute, private router: Router, private store: Store<reducers.State>,
    private creditserv: CreditsService, public auth: AuthService) {

  }

  ngOnInit() {
    this.routerSubscription = this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.changeList()
      }
    })

    this.changeList()
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe()
  }

  changeList() {
    this.type_list = this.route.snapshot.paramMap.get("type_list");
    this.credits = this.type_list == 'requests' ? false : true;
    if (this.type_list == 'history') {
      this.getHistory();
    } else if (this.type_list == 'credits') {
      this.getCredits(true);
    } else if (this.type_list == 'requests') {
      this.getCredits(false);
    }
  }

  getCredits(credits) {
    this.credits = credits;
    this.store.dispatch(new GetListRequest({ filter: null, credits: this.credits, identificacion: this.identificacion }));
  }

  getHistory(data?: any) {
    this.historyIsLoaded = false;
    this.showLoadingHistory = true;
    this.creditserv.loanHistory(data).subscribe(history => {
      this.historyc = history;
      this.showLoadingHistory = false;
      this.historyIsLoaded = true;
    });
  }

}
