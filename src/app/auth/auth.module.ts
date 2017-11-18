import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserComponent } from './user/user.component';
import { SharedModule } from './../shared/shared.module';
import { AuthGuardService } from './auth-guard.service'
import { AuthRoutingModule } from './auth-routing.module';
 
@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    UserComponent
  ],
  imports: [ 
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    AuthRoutingModule
  ],
  exports: [ 
  ],
  providers: [AuthGuardService]
})

export class AuthModule {}
