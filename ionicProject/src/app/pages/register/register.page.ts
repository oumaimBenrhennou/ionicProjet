


import { LoginService } from '../../services/login.service';
import { Component, OnInit, NgZone } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  userDetails = {
    username: '',
    country : '',
    phone: '',
    password: '',
    cpassword: ''
  }

  
  recaptchaVerifier:firebase.default.auth.RecaptchaVerifier;
  public emailPasswordForm: FormGroup;

  error_messages = {
    'username': [
      { type: 'required', message: 'Username is required.' },
      { type: 'minlength', message: 'Must be longer or equal to 6 character.' },
      { type: 'maxlength', message: 'Must be lower or equal to 18 character.' },
      { type: 'pattern', message: 'Please enter a valid Username' }
    ],
    'password': [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message: 'Must be longer or equal to 6 character.' },
      { type: 'maxlength', message: 'Must be lower or equal to 30 character.' },
      { type: 'pattern', message: 'Please enter a valid password' }
    ],
    'cpassword': [
      { type: 'required', message: 'confirm password' },
      { type: 'minlength', message: 'Must be longer or equal to 6 character.' },
      { type: 'maxlength', message: 'Must be lower or equal to 30 character.' },
      { type: 'pattern', message: 'Please enter a valid password comfirm' }
    ],
  }

  constructor(
    private router: Router,
    private loginService: LoginService,
    private formBuilder: FormBuilder,
    public auth : AngularFireAuth,
    public ngZone: NgZone
  ) {
    this.emailPasswordForm = this.formBuilder.group({
      phone: new FormControl('', Validators.compose([
        Validators.required
      ])),
      username: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(18),
        Validators.pattern('^(?=.{8,20}$)(?![_.])(?!.*[_. ]{2})[\p{éèàüöêåø }{\u0600-\u06FF }{a-zA-Z0-9._ }]+[\p{éèàüöêåø}{\u0600-\u06FF}{a-zA-Z0-9._}]+(?![_.])$')
      ]))
    });


   
  }

  

  ngOnInit() {
    this.ngZone.run(()=>{
      this.recaptchaVerifier = new firebase.default.auth.RecaptchaVerifier('recaptcha-container');
    })
    
  }

  register(){
    this.loginService.PhoneNumber(this.userDetails.phone,this.recaptchaVerifier,this.userDetails)
  }
  back(){
    this.router.navigateByUrl('/login');
  }

}
