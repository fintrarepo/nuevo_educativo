import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Store } from '@ngrx/store';
import * as reducers from '../../reducers/reducers';
import { NgbTabset, NgbTabChangeEvent } from "@ng-bootstrap/ng-bootstrap";
import { SelecteTab1SubTab2, SelecteTab2SubTab1, SelecteTab2SubTab2, SelecteTab1SubTab3 } from '../../actions/tabs.actions';

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

  @ViewChild('tabs2', {
    static: false
  }) private tabs2Component: NgbTabset;




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
    // if (this.tabs.tab1.active) {
    //   this.superTabsComponent.select('tab1')
    //   if (this.tabs.tab1SubTab1.active) {
    //     this.tabsComponent.select('tab1SubTab1')
    //   }
    //   if (this.tabs.tab1SubTab2.active) {
    //     this.tabsComponent.select('tab1SubTab2')
    //   }
    //   if (this.tabs.tab1SubTab3.active) {
    //     this.tabsComponent.select('tab1SubTab3')
    //   }
    // } else if (this.tabs.tab2.active) {
    //   setTimeout(() => {
    //     this.superTabsComponent.select('tab2')

    //     if (this.tabs.tab2SubTab1.active) {
    //       this.tabs2Component.select('tab2SubTab1')
    //     }

    //     if (this.tabs.tab2SubTab2.active) {
    //       this.tabs2Component.select('tab2SubTab2')
    //     }

    //   }, 1000)
    // }
  }

  ngOnInit() {
    //this.store.dispatch(new SelecteTab1SubTab3())
  }

  ngAfterViewChecked() {
    this.tabs$.subscribe(this.getTabs.bind(this))
    
  }

  beforeChange($event: NgbTabChangeEvent) {
    // if (this.tabs[$event.nextId].disabled) {
    //   $event.preventDefault();
    // }
  }

}
