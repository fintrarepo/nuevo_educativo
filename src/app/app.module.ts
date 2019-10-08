import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

//ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'


//Pages
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { NotApprovedComponent } from './pages/not-approved/not-approved.component';
import { ApprovedComponent } from './pages/approved/approved.component';

//Component
import { AlertsComponent } from './components/alerts/alerts.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';


//reducers
import { reducers, metaReducers } from './reducers/reducers';


//Effects
import { AuthEffects } from './effects/auth.effects';
import { AddressFormEffects } from './effects/addressForm.effects';
import { OpenRecoveryPasswordEffects } from './effects/recoverPassword.effects'
import { ListRequestEffects } from './effects/list-request.effects';
import { SimulatorEffects } from './effects/simulator.effects';
import { CreditEffects } from './effects/credit.effect';
import { Tab1SubTab1Effects } from './effects/tab1SubTab1.effect';
import { Tab1SubTab2Effects } from './effects/tab1SubTab2.effect';











const effects = [
  AuthEffects,
  AddressFormEffects,
  OpenRecoveryPasswordEffects,
  ListRequestEffects,
  SimulatorEffects,
  CreditEffects,
  Tab1SubTab1Effects,
  Tab1SubTab2Effects
]

const NGRX_IMPORTS = [
  StoreModule.forRoot(reducers, { metaReducers }),
  StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
  EffectsModule.forRoot(effects),
  StoreDevtoolsModule.instrument({
    name: "PortalFintra",
    maxAge: 25, // Retains last 25 states
    logOnly: environment.production, // Restrict extension to log-only mode
  })
]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AlertsComponent,
    NotApprovedComponent,
    ApprovedComponent,
    RecoverPasswordComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ...NGRX_IMPORTS,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }







