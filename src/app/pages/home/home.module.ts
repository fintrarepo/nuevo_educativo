import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
// import { ArchwizardModule } from 'angular-archwizard';
import { FormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

//Pages
import { HomeComponent } from './home.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { UploadsComponent } from '../uploads/uploads.component';
import { CreditApplicationComponent } from '../credit-application/credit-application.component';
import { NewRequestComponent } from '../new-request/new-request.component';
import { SigningComponent } from '../signing/signing.component';


//Components
import { TabsComponent } from '../../components/tabs/tabs.component';

import { ListRequestComponent } from '../../components/list-request/list-request.component';
import { TimelineComponent } from '../../components/timeline/timeline.component';
import { Tab1PersonalInformationComponent } from '../../components/tab1-personal-information/tab1-personal-information.component';
import { Tab1WorkingInformationComponent } from '../../components/tab1-working-information/tab1-working-information.component';
import { Tab1ReferencesComponent } from '../../components/tab1-references/tab1-references.component';
import { Tab2PersonalInformationComponent } from '../../components/tab2-personal-information/tab2-personal-information.component';
import { Tab2WorkingInformationComponent } from '../../components/tab2-working-information/tab2-working-information.component';
import { EvidentComponent } from '../../components/evident/evident.component';
import { PopupApprovedComponent } from '../../components/popup-aproved/popup-approved.component';
import { HistoryRequestComponent } from '../../components/history-request/history-request.component';
import { CreditComponent } from '../../components/credit/credit.component';
import { LoadingFormsComponent } from '../../components/loading-forms/loading-forms.component';
import { UpdateInfoComponent } from '../../components/update-info/update-info.component';
import { NotApprovedComponent } from '../../components/not-approved/not-approved.component';
import { ReferredComponent } from '../../components/referred/referred.component';


//GUARDS
import { AuthGuard } from '../../auth.guard';

//DIRECTIVES
import { InputDateDirective } from '../../directives/input-date.directive';

// modals
import { ModalDelete } from '../modals/delete/modalDelete';
import { SafePipe } from '../../pipes/safe.pipe';
import { SharedModule } from 'src/app/shared.module';
import { ReconocerComponent } from '../reconocer/reconocer.component';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { FirmDocumentsComponent } from 'src/app/components/firmDocuments/firmDocuments.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      
      {
        path: '',
        redirectTo: 'dashboard/requests',
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
        path: 'upload/:id/:sol',
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
      },
      {
        path: 'renew-credit/:id',
        component: NewRequestComponent
      },
      {
        path: 'referir',
        component: ReferredComponent
      },
      {
        path: 'signing/:id/:num',
        component: SigningComponent
      },
      {
        path: 'reconocer/:neg/:num',
        component: ReconocerComponent
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
  ModalDelete
]

const components = [
  TabsComponent,
  FirmDocumentsComponent,
  ListRequestComponent,
  TimelineComponent,
  Tab1PersonalInformationComponent,
  Tab1WorkingInformationComponent,
  Tab1ReferencesComponent,
  Tab2WorkingInformationComponent,
  EvidentComponent,
  PopupApprovedComponent,
  HistoryRequestComponent,
  Tab2PersonalInformationComponent,
  CreditComponent,
  LoadingFormsComponent,
  UpdateInfoComponent,
  NotApprovedComponent,
  ReferredComponent,
  ReconocerComponent
]

const directives = [
  InputDateDirective
]

@NgModule({
  declarations: [
    ...pagesComponets,
    ...components,
    ...directives,
    SafePipe 
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFontAwesomeModule,
    SelectDropDownModule,
    SharedModule,
    ...boostrapModules
  ],
  entryComponents: [ModalDelete,FirmDocumentsComponent],
  exports: [RouterModule, SigningComponent, ModalDelete]
})
export class HomeModule { }
