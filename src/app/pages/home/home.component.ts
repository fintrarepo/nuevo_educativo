import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as reducers from '../../reducers/reducers';
import { AuthService } from '../../services/auth/auth.service'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  showMenu: boolean = false;
  blurPage$ = this.store.select(reducers.platformIsBlur);


  constructor(private store: Store<reducers.State>, public auth : AuthService) { }

  ngOnInit() {
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

}
