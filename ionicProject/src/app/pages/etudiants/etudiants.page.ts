

import { ToastController } from '@ionic/angular';
import { ApiService } from '../../services/api.service'; 
import { Component, OnInit, NgZone } from '@angular/core';
import { LogoutService } from 'src/app/services/logout.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-etudiants',
  templateUrl: './etudiants.page.html',
  styleUrls: ['./etudiants.page.scss'],
})
export class EtudiantsPage implements OnInit {
 


  public etudiants ;


  constructor(
    public api: ApiService,
    private toastCtrl: ToastController,
    public ngZone: NgZone,
    private router: Router,
    private logoutService: LogoutService

  ) {
   

  }
  ngOnDestroy(){
 
  }


  ngOnInit() { 
   this.get_etudiants();
  } 


  get_etudiants(){

    this.api.get_etudiants().subscribe((res)=>{
      console.log(res)
      if(res.length){
        this.etudiants = res;
      }
      else{
        this.etudiants = 'aucun';
      }
    },error=>{
      this.presentToast('Something went wrong',3200);
      this.etudiants = 'error';
    })
  }

  logout(){
    this.logoutService.logOut().then(()=>{
      this.router.navigateByUrl('/login')
    }).catch(()=>{
      //something went wrong
    })
  }


  async presentToast(message,delay) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: delay
    });
    toast.present();
  }








  
}
