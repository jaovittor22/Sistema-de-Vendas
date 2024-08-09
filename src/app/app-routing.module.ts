import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { LayoutComponent } from './componentes/layout/layout.component';
import { HomeComponent } from './componentes/home/home.component';

const routes: Routes = [
  
  { path : 'login', component: LoginComponent }, 
  { path : '',      component: LayoutComponent, children:[
      { path : 'home',  component: HomeComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full'}    
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
