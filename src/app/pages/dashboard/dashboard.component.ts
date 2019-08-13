import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  type_list: String;
  constructor(private route: ActivatedRoute, private router: Router) {
    router.events.subscribe((val) => {
      // see also 
      if (val instanceof NavigationEnd) {
        this.type_list = this.route.snapshot.paramMap.get("type_list") || "requests";
      }
    });
  }

  ngOnInit() {

  }

}
