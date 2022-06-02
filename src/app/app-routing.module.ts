import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { CuentaAhorroComponent } from './pages/cuenta-ahorro/cuenta-ahorro.component';
import { TransaccionesComponent } from './pages/transacciones/transacciones.component';
import { TransferenciaComponent } from './pages/transferencia/transferencia.component';


const routes: Routes = [
  { path: 'home'    , component: HomeComponent, canActivate:[AuthGuard] },
  { path: 'registro', component: RegistroComponent },
  { path: 'login'   , component: LoginComponent },
  { path: 'cuenta'   , component: CuentaAhorroComponent },
  { path: 'historial'   , component: TransaccionesComponent },
  { path: 'transferencia'   , component: TransferenciaComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'registro'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
