import { Component, HostListener, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as reducers from '../../reducers/reducers';
import { AuthService } from '../../services/auth/auth.service';
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  currenturl;
  routerSubscription;

  showMenu: boolean = false;
  blurPage$ = this.store.select(reducers.platformIsBlur);

  isApproved$ = this.store.select(reducers.isApproved);

  currentBussiness$ = this.store.select(reducers.currentBussiness);

  isShowNotApproved$ = this.store.select(reducers.isShowNotApproved);
  main: string;
  Mainwidth: string;

  constructor(private activeRoute: ActivatedRoute, private store: Store<reducers.State>, public auth: AuthService, private route: Router) {
    this.currenturl = this.route.url;

    this.routerSubscription = this.route.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.showMenu = false;
      }
    })
      this.main = window.innerHeight + 'px';
      this.Mainwidth = window.innerWidth + 'px';
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.main = window.innerHeight + 'px';
    this.Mainwidth = window.innerWidth + 'px';
  }

  ngOnInit() {
    this.route.events.subscribe((event) => {
      this.currenturl = this.route.url;
    });
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  closeSession() {
    localStorage.clear()
    this.route.navigate(['/login']);
  }

}
