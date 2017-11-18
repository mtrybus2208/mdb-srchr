import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuardService } from './auth-guard.service'
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserComponent } from './user/user.component';

const authRoutes: Routes = [
  {path: '', children: [
    {path: 'registration', component: RegistrationComponent},
    {path: 'login', component: LoginComponent},
    {path: 'user', canActivate: [AuthGuardService], component: UserComponent}
  ]},
]

@NgModule({
  imports: [ 
    RouterModule.forChild(authRoutes)
  ],
  exports: [RouterModule]
}) 
export class AuthRoutingModule {}
 