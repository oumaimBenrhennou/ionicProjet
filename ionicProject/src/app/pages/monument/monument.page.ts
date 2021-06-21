

import { NavParams, ModalController, NavController, ToastController } from '@ionic/angular';
import { ApiService } from './../../services/api.service'; 
import { AddVisitPage } from '../add-visit/add-visit.page';

import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-monument',
  templateUrl: './monument.page.html',
  styleUrls: ['./monument.page.scss'],
})
export class MonumentPage implements OnInit {
 


  public visits ;
  public title; public image; public ville;
  public latitude; public longitude; public monumentId;

  public storageref; public url;

  constructor(
    private modalCtrl: ModalController,
    public api: ApiService,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private toastCtrl: ToastController,
    public ngZone: NgZone,

  ) {
   

    this.route.queryParams.subscribe(params => {
      this.monumentId = params["id"];
      this.image = this.get_image(params["image"]);
      this.title = params["title"];
      this.ville = params["ville"];
      this.latitude = params["latitude"];
      this.longitude = params["longitude"];
  });

    
   
  }


  get_image(image){
    console.log(image)
    if(image.startsWith('http')){
      return image;
    }
    else{
     return 'https://khadijaexpress.herokuapp.com/'+image;
    }
  }


  ngOnDestroy(){
 
  }


  ngOnInit() { 
   this.get_visits();
  } 


  get_visits(){
    console.log(this.monumentId);

    this.api.get_visits({id: this.monumentId}).subscribe((res)=>{
      console.log(res)
      if(res.length){
        this.visits = res;
      }
      else{
        this.visits = 'aucun';
      }
    },error=>{
      this.presentToast('Something went wrong',3200);
      this.visits = 'error';
    })
  }

  async add_visit() {
    const modal = await this.modalCtrl.create({
      component: AddVisitPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'monumentId': this.monumentId
      }
    });
    return await modal.present();
  }

  async presentToast(message,delay) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: delay
    });
    toast.present();
  }
close(){
  this.navCtrl.pop();
}








  
}
