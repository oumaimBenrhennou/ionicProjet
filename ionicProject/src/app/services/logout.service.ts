

import { Injectable } from '@angular/core';
import { EventsService } from './../services/events.service';
import { LoadingService } from './loading.service';
import { DataService } from './data.service';
import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(
    public loading: LoadingService,
    public dataService: DataService,
    public events: EventsService
  ) { }

  logOut(){
    var promise = new Promise((resolve, reject) =>{
      this.loading.show();
        firebase.default.auth().signOut().then((success) =>{
          this.loading.hide()
          resolve(true);
        }).catch((err) =>{
          reject(err)

        })
    })
    return promise

  } 





}
