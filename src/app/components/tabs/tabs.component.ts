import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  constructor() {
    // this.store.select('tab1').subscribe(tab1Store => this.tab1 = tab1Store)
    // this.store.select('tab1Subtab1').subscribe(tab1Subtab1Store => this.tab1Subtab1 = tab1Subtab1Store)
    // this.store.select('tab1Subtab2').subscribe(tab1Subtab2Store => this.tab1Subtab2 = tab1Subtab2Store)
    // this.store.select('tab1Subtab3').subscribe(tab1Subtab3Store => this.tab1Subtab3 = tab1Subtab3Store)

    // this.store.select('tab2').subscribe(tab2Store => this.tab2 = tab2Store)

  }

  send() {
    // const action2 = new ToggleDisabledTab1SubTab1(!this.tab1Subtab1.disabled);
    // this.store.dispatch(action2);
  }

  ngOnInit() {
  }

}
