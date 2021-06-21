
import { EventsService } from './services/events.service';
import { Component, NgZone, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LogoutService } from './services/logout.service';
 

@Component({

  selector: 'app-root',
  templateUrl: 'app.component.html',  
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  appPages = [ 
    {
      title: 'Schedule', 
      url: '/app/tabs/schedule',
      icon: 'calendar'
    },
    {
      title: 'Speakers',
      url: '/app/tabs/speakers',
      icon: 'people'
    },
    {
      title: 'Map',
      url: '/app/tabs/map',
      icon: 'map'
    },
    {
      title: 'About',
      url: '/app/tabs/about',
      icon: 'information-circle'
    }
  ];
 

  //////////////////////
  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    public events: EventsService,
    public ngZone: NgZone,
    public logoutService: LogoutService

  ) {

   
  }
 
  initializeApp() {
    this.platform.ready().then(() => {
     
     //this.statusBar.overlaysWebView(true)
    

      
    });
    
  }





  ngOnInit() {

    
  }


  
}
