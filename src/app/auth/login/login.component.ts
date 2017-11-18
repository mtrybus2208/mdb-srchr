import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  host: {'class': 'col-12  col-md-12  film-category_results'}
})
export class LoginComponent implements OnInit {

  loading: boolean;
  loginForm: FormGroup;

  constructor( private authSerivice: AuthService, private router: Router ) { }

  ngOnInit() {
    this.loading = true;
    this.loginForm = new FormGroup({
      'userMail': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }
  onLogin(){ 
    const email = this.loginForm.controls.userMail.value;
    const password = this.loginForm.controls.password.value;
    this.authSerivice.loginByMail(email, password)
  }
  onGoogleLogin(){
    this.authSerivice.googleLogin()
  }
}
