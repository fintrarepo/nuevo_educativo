import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

//Pages
import { HomeComponent } from './home.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { UploadsComponent } from '../uploads/uploads.component';
import { CreditApplicationComponent } from '../credit-application/credit-application.component';

//Components

import { TabsComponent } from '../../components/tabs/tabs.component';
import { AddressFormComponent } from '../../components/address-form/address-form.component';
import { ListRequestComponent } from '../../components/list-request/list-request.component';
import { TimelineComponent } from '../../components/timeline/timeline.component';
import { Tab1PersonalInformationComponent } from '../../components/tab1-personal-information/tab1-personal-information.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,

    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'upload',
        component: UploadsComponent
      },
      {
        path: 'credit-application',
        component: CreditApplicationComponent
      }
    ],
  },
  { path: '**', redirectTo: 'upload' }
]


const boostrapModules = [
  NgbModule
]

@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    UploadsComponent,
    CreditApplicationComponent,

    TabsComponent,
    AddressFormComponent,
    ListRequestComponent,
    TimelineComponent,
    Tab1PersonalInformationComponent
    
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ...boostrapModules
  ],
  exports: [RouterModule]
})
export class HomeModule { }
