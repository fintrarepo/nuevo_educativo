import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { UtilsService } from '../../services/utils/utils.service'
import { Store } from '@ngrx/store';
import * as reducers from '../../reducers/reducers';
import { NgbTabset, NgbTabChangeEvent } from "@ng-bootstrap/ng-bootstrap";
import { SelecteTab1SubTab2, SelecteTab2SubTab1, SelecteTab2SubTab2, SelecteTab1SubTab3, SelecteTab1SubTab1 } from '../../actions/tabs.actions';
import { SetCurrentBussinees } from '../../actions/platform.actions';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  tabs;
  form;
  business;

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

  tab1SubTab1$ = this.store.select(reducers.Tab1SubTab1State);
  tab1SubTab2$ = this.store.select(reducers.Tab1SubTab2State);
  tab1SubTab3$ = this.store.select(reducers.Tab1SubTab3State);

  tab2SubTab1$ = this.store.select(reducers.Tab2SubTab1State);
  tab2SubTab2$ = this.store.select(reducers.Tab2SubTab2State);

  disabledTab1: boolean = true;
  disabledTab2: boolean = true;

  disabledTab1SubTab1: boolean = true;
  disabledTab1SubTab2: boolean = true;
  disabledTab1SubTab3: boolean = true;

  disabledTab2SubTab1: boolean = true;
  disabledTab2SubTab2: boolean = true;

  constructor(private router: Router,
    private utils: UtilsService,
    private route: ActivatedRoute,
    private store: Store<reducers.State>) {
    this.business = this.route.snapshot.paramMap.get("id")
  }


  getTabs(tabs) {
    this.tabs = tabs;
  }



  ngOnInit() {
    this.utils.getCurrentStep({ "numero_solicitud": this.business }).subscribe(response => {
      this.store.dispatch(new SetCurrentBussinees(response.data))
      switch (response.data.numero_tab + 1) {
        case 1:
          return this.store.dispatch(new SelecteTab1SubTab1())
        case 2:
          return this.store.dispatch(new SelecteTab1SubTab2())
        case 3:
          return this.store.dispatch(new SelecteTab1SubTab3())
        case 4:
          return this.store.dispatch(new SelecteTab2SubTab1())
        case 5:
          return this.store.dispatch(new SelecteTab2SubTab2())
      }


    })
  }

  ngAfterViewChecked() {
    this.tabs$.subscribe(this.getTabs.bind(this))

    this.tab1SubTab1$.subscribe(this.selectTab1SubTab1.bind(this))
    this.tab1SubTab2$.subscribe(this.selectTab1SubTab2.bind(this))
    this.tab1SubTab3$.subscribe(this.selectTab1SubTab3.bind(this))



    this.tab2SubTab1$.subscribe(this.selectTab2SubTab1.bind(this))
    this.tab2SubTab2$.subscribe(this.selectTab2SubTab2.bind(this))




  }

  selectTab1SubTab1(state) {

    
    // var myDiv = document.getElementById('section');
    // myDiv.scrollTop = 0;
    

    if (state.active && this.tabsComponent.activeId != "tab1SubTab1") {
      this.disableAllTabs();
      this.disabledTab1 = false;
      this.disabledTab1SubTab1 = false;
      this.superTabsComponent.select('tab1')
      this.tabsComponent.select('tab1SubTab1')
    }
  }

  selectTab1SubTab2(state) {

    
    // var myDiv = document.getElementById('section');
    // myDiv.scrollTop = 0;
    

    //console.log(this.tabsComponent.activeId)
    if (state.active && this.tabsComponent.activeId != "tab1SubTab2") {
      this.disableAllTabs();
      this.disabledTab1 = false;
      this.disabledTab1SubTab2 = false;
      this.superTabsComponent.select('tab1')
      this.tabsComponent.select('tab1SubTab2')
    }

  }

  selectTab1SubTab3(state) {

    
    // var myDiv = document.getElementById('section');
    // myDiv.scrollTop = 0;
    

    if (state.active && this.tabsComponent.activeId != "tab1SubTab3") {
      this.disableAllTabs();
      setTimeout(() => {
        this.disabledTab1 = false;
        this.disabledTab1SubTab3 = false;
        this.superTabsComponent.select('tab1')
        this.tabsComponent.select('tab1SubTab3')
      }, 500)
    }
  }

  selectTab2SubTab1(state) {

    
    // var myDiv = document.getElementById('section');
    // myDiv.scrollTop = 0;
    

    if (state.active) {
      this.disableAllTabs();
      this.disabledTab2 = false;
      this.disabledTab2SubTab1 = false;
      this.superTabsComponent.select('tab2')
      this.tabs2Component.select('tab2SubTab1')
    }
  }

  selectTab2SubTab2(state) {

    
    // var myDiv = document.getElementById('section');
    // myDiv.scrollTop = 0;
    

    if (state.active && this.tabs2Component.activeId != "tab2SubTab2") {
      this.disableAllTabs();
      setTimeout(() => {
        this.disabledTab2 = false;
        this.disabledTab2SubTab2 = false;
        this.superTabsComponent.select('tab2')
        this.tabs2Component.select('tab2SubTab2')
      })
    }
  }

  beforeChange($event: NgbTabChangeEvent) {
    if (this.tabs[$event.nextId].disabled) {
      $event.preventDefault();
    } else {
      // alert($event.nextId)
      // alert($event.nextId)
      // switch ($event.nextId) {
      //   case "tab1SubTab1":
      //     return this.store.dispatch(new SelecteTab1SubTab1())
      //   case "tab1SubTab2":
      //     return this.store.dispatch(new SelecteTab1SubTab2())
      //   case "tab1SubTab3":
      //     return this.store.dispatch(new SelecteTab1SubTab3())
      //   case "tab2SubTab1":
      //     return this.store.dispatch(new SelecteTab2SubTab1())
      //   case "tab2SubTab2":
      //     return this.store.dispatch(new SelecteTab2SubTab2())
      // }
    }
  }

  private disableAllTabs() {
    this.disabledTab1 = true;
    this.disabledTab2 = true;

    this.disabledTab1SubTab1 = true;
    this.disabledTab1SubTab2 = true;
    this.disabledTab1SubTab3 = true;

    this.disabledTab2SubTab1 = true;
    this.disabledTab2SubTab2 = true;
  }

}
