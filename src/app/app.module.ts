import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';

//ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { ReactiveFormsModule } from '@angular/forms';

//Pages
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { NotApprovedComponent } from './pages/not-approved/not-approved.component';
import { ApprovedComponent } from './pages/approved/approved.component';

//Component
import { AlertsComponent } from './components/alerts/alerts.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';

//reducers
import { reducers, metaReducers } from './reducers/reducers';


//Effects
import { AuthEffects } from './effects/auth.effects';
import { AddressFormEffects } from './effects/addressForm.effects';
import { OpenRecoveryPasswordEffects } from './effects/recoverPassword.effects'





const NGRX_IMPORTS = [
  StoreModule.forRoot(reducers, { metaReducers }),
  StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
  EffectsModule.forRoot([AuthEffects, AddressFormEffects, OpenRecoveryPasswordEffects]),
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
    RecoverPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ...NGRX_IMPORTS,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }







