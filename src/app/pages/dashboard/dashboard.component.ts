import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";
import { GetListRequest } from 'src/app/actions/list-requests.actions';
import { Store } from '@ngrx/store';
import * as reducers from '../../reducers/reducers';
import { CreditsService } from '../../services/credits/credits.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  type_list: String;
  credits: boolean = false;
  historyc: any[] = [];
  constructor(private route: ActivatedRoute, private router: Router, private store: Store<reducers.State>,
    private creditserv: CreditsService, public auth: AuthService) {
    router.events.subscribe((val) => {
      // see also 
      if (val instanceof NavigationEnd) {
        this.type_list = this.route.snapshot.paramMap.get("type_list") || "requests";
        this.credits = this.type_list == 'requests' ? false : true;
        if(this.type_list == 'history'){
          this.getHistory();
        }
      }
    });
  }

  ngOnInit() {
      this.getCredits(this.credits);
  }

  getCredits(credits) {
    this.credits = credits;
    this.store.dispatch(new GetListRequest({ filter: null, credits: this.credits }));
  }

  getHistory(data?: any) {
    this.creditserv.loanHistory(data).subscribe(history => {
      this.historyc = history;
    });
  }

}
