import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Store } from '@ngrx/store';
import * as reducers from '../../reducers/reducers';
import { NgbTabset, NgbTabChangeEvent } from "@ng-bootstrap/ng-bootstrap";
import { SelecteTab1SubTab2 } from '../../actions/tabs.actions';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  @ViewChild('toptaps', {
    static: false
  }) private superTabsComponent: NgbTabset;
  @ViewChild('tabs', {
    static: false
  }) private tabsComponent: NgbTabset;



  tabs$ = this.store.select(reducers.getTabsState);

  tabs;
  form;

  constructor(private router: Router, private route: ActivatedRoute, private store: Store<reducers.State>) {

  }


  getTabs(tabs) {
    this.tabs = tabs;
    this.changeTab()
  }

  changeTab() {
    if (this.tabs.tab1.active) {
      this.superTabsComponent.select('tab1')
      if (this.tabs.tab1SubTab1.active) {
        this.tabsComponent.select('tab1SubTab1')
      }
      if (this.tabs.tab1SubTab2.active) {
        this.tabsComponent.select('tab1SubTab2')
      }
      if (this.tabs.tab1SubTab3.active) {
        this.tabsComponent.select('tab1SubTab3')
      }
    } else if (this.tabs.tab2.active) {
      setTimeout(() => {
        this.superTabsComponent.select('tab2')
      }, 5000)
    }
  }

  ngOnInit() {

  }

  ngAfterViewChecked() {
    this.tabs$.subscribe(this.getTabs.bind(this))
    //this.superTabsComponent.select('tab2')
  }

  beforeChange($event: NgbTabChangeEvent) {
    // if (this.tabs[$event.nextId].disabled) {
    //   $event.preventDefault();
    // }
  }

}
