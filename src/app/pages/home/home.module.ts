import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ArchwizardModule } from 'angular-archwizard';
import { FormsModule } from '@angular/forms';

//Pages
import { HomeComponent } from './home.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { UploadsComponent } from '../uploads/uploads.component';
import { CreditApplicationComponent } from '../credit-application/credit-application.component';
import { NewRequestComponent } from '../new-request/new-request.component';


//Components
import { TabsComponent } from '../../components/tabs/tabs.component';
import { AddressFormComponent } from '../../components/address-form/address-form.component';
import { ListRequestComponent } from '../../components/list-request/list-request.component';
import { TimelineComponent } from '../../components/timeline/timeline.component';
import { Tab1PersonalInformationComponent } from '../../components/tab1-personal-information/tab1-personal-information.component';
import { Tab1WorkingInformationComponent } from '../../components/tab1-working-information/tab1-working-information.component';
import { Tab1ReferencesComponent } from '../../components/tab1-references/tab1-references.component';
import { EvidentComponent } from '../../components/evident/evident.component';
import { PopupApprovedComponent } from '../../components/popup-aproved/popup-approved.component';
import { RequestComponent } from '../../components/request/request.component';
import { HistoryRequestComponent } from '../../components/history-request/history-request.component';
import { CreditComponent } from '../../components/credit/credit.component';


//GUARDS
import { AuthGuard } from '../../auth.guard';

//DIRECTIVES
import { InputDateDirective } from '../../directives/input-date.directive';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'dashboard/:type_list',
        component: DashboardComponent
      },
      {
        path: 'upload',
        component: UploadsComponent
      },
      {
        path: 'credit-application/:id',
        component: CreditApplicationComponent
      },
      {
        path: 'history',
        component: HistoryRequestComponent
      },

      {
        path: 'new-request',
        component: NewRequestComponent
      }
    ],
  },
  { path: '**', redirectTo: 'upload' }
]

const boostrapModules = [
  NgbModule
]

const pagesComponets = [
  HomeComponent,
  DashboardComponent,
  UploadsComponent,
  CreditApplicationComponent,
  NewRequestComponent,
]

const components = [
  TabsComponent,
  AddressFormComponent,
  ListRequestComponent,
  TimelineComponent,
  Tab1PersonalInformationComponent,
  Tab1WorkingInformationComponent,
  Tab1ReferencesComponent,
  EvidentComponent,
  PopupApprovedComponent,
  HistoryRequestComponent,
  CreditComponent
]

const directives = [
  InputDateDirective
]

@NgModule({
  declarations: [
    ...pagesComponets,
    ...components,
    ...directives
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    ArchwizardModule,
    FormsModule,
    ...boostrapModules
  ],
  exports: [RouterModule]
})
export class HomeModule { }
