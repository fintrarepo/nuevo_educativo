import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Store } from '@ngrx/store';
import * as reducers from '../../reducers/reducers';
import { NgbTabset } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  @ViewChild('tabs', {
    static: false
  }) private tabsComponent: NgbTabset;

  tabs$ = this.store.select(reducers.getTabsState);

  tabs;
  form;
  constructor(private router: Router, private route: ActivatedRoute, private store: Store<reducers.State>) {
    this.form = this.route.snapshot.paramMap.get("form");
    this.tabs$.subscribe(this.getTabs.bind(this))


  }

  send() {
    // const action2 = new ToggleDisabledTab1SubTab1(!this.tab1Subtab1.disabled);
    // this.store.dispatch(action2);
  }

  getTabs(tabs) {
    console.log(tabs)
    this.tabs = tabs;
  }

  changeTab() {
    // if (this.form == 'personal-information') {
    //   this.tabsComponent.select('tab1SubTab1')
    // } else {
    //   this.tabsComponent.select('tab1SubTab2')
    // }
  }

  ngOnInit() {

  }

  ngAfterViewChecked() {
    this.changeTab()
  }

}
