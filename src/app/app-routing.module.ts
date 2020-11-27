import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/authentication/login/login.component';
import { SignupComponent } from './modules/authentication/signup/signup.component';
import { HomeComponent } from './modules/home/home.component';

const routes: Routes = [
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
