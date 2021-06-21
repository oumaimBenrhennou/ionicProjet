

import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-welcome',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class WelcomePage {
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  constructor(private router: Router) {}




  register(){
    this.router.navigateByUrl('/register');
  }
}