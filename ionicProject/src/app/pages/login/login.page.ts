
import { LoginService } from '../../services/login.service'; 
import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';


//declare var AccountKitPlugin;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string = "";
  password: string = "";
  userDetails = {
    phone: '',
    password: '',
  }
  disabled = true;
  recaptchaVerifier:firebase.default.auth.RecaptchaVerifier;
  public loginForm: FormGroup;



loginbtnFocus = '';

  error_messages = {
    'passwordx': [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message: 'must be longer or equal to 6 character.' },
      { type: 'maxlength', message: 'must be lower or equal to 30 character.' },
      { type: 'pattern', message: 'Please enter a valid password' }
    ],
  }




  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private loginService: LoginService,
    public ngZone: NgZone
  ) {
    this.loginForm = this.formBuilder.group({
      phone: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });




  }

  ngOnInit() {
    this.ngZone.run(()=>{
      this.recaptchaVerifier = new firebase.default.auth.RecaptchaVerifier('recaptcha-container');
    })
   
  }



  signUp() {
    this.ngZone.run(()=>{
      this.router.navigateByUrl('/register')
    })
    
  }
  //handler for login page
  login() {
    
  if(this.userDetails.phone == ''){
    this.loginService.showAlert('Check Your information','Please insert your phone number')
  }
  else{
    this.loginService.login(this.userDetails.phone,this.recaptchaVerifier)
  }
    
  }



 





}
