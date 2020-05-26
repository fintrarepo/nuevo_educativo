import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from "./pages/register/register.component";
import { NotApprovedComponent } from './pages/not-approved/not-approved.component';
import { ApprovedComponent } from './pages/approved/approved.component';
import { UpdateInfoComponent } from './update-info/update-info.component';
import { GetExtractComponent } from './pages/get-extract/get-extract.component'


//GUARDS
import { NoAuthGuard } from './auth.guard';
const routes: Routes = [
  {
    path: 'app',
    loadChildren: () => import('./pages/home/home.module').then(mod => mod.HomeModule)
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'login/:user/:saggicUser',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'not-approved',
    component: NotApprovedComponent
  },
  {
    path: 'approved',
    component: ApprovedComponent
  },
  {
    path: 'update-info',
    component: UpdateInfoComponent
  },
  {
    path: 'get-extract/:id',
    component: GetExtractComponent
  },
  {
    path: '',
    redirectTo: 'app',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
