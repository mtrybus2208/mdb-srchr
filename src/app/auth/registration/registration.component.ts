import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';

@Component({ 
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  host: {'class': 'col-12  col-md-12  film-category_results'}
})
export class RegistrationComponent implements OnInit {

  loading: boolean;
  registerForm: FormGroup;

  constructor( private authSerivice: AuthService, private router: Router ) { }

  ngOnInit() {  
    this.loading = true;
    this.registerForm = new FormGroup({
      'userMail': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'userName': new FormControl(null, [Validators.required])
    })
  }
  onRegister() {
    const email = this.registerForm.controls.userMail.value;
    const password = this.registerForm.controls.password.value;
    const userName = this.registerForm.controls.userName.value;
    this.authSerivice.registerByMail( email, password, userName )
  }
  onGoogleRegister(){
    this.authSerivice.googleLogin()
  }
  onFbRegister(){
    // this.authSerivice.facebookRegister();
  }
 
}
