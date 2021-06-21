


import {  ModalController } from '@ionic/angular';
import { ApiService } from './../../services/api.service'; 
import { SocketService } from './../../services/socket.service'; 
import { EventsService } from './../../services/events.service'; 
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImageService } from 'src/app/services/image.service';

import { Component, OnInit, NgZone, ElementRef, Renderer2 } from '@angular/core';
import { FormGroup } from '@angular/forms';

 
@Component({ 
  selector: 'app-addmonument',
  templateUrl: './addmonument.page.html',
  styleUrls: ['./addmonument.page.scss'],
})
export class AddMonumentPage implements OnInit { 

    //username: '', 
   public nom =  ''
   public ville = ''
   public latitude= ''
   public longitude= '';

  private optionGallery: CameraOptions;
  public storageref; public url;

  public monumentForm: FormGroup;
  constructor( public element: ElementRef,
    public renderer: Renderer2,
    private modalCtrl: ModalController,
    public api: ApiService,
    public socket: SocketService,
    public events: EventsService,
    private camera: Camera,
    private imageService: ImageService,
    public ngZone: NgZone,

  ) {
   

    
    this.optionGallery = {
      quality: 100,
      targetHeight: 800,
      targetWidth: 800,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true,
      allowEdit: true
    } 
  }
  ngOnDestroy(){
 
  }


  ngOnInit() { 

  } 

close(){
  this.modalCtrl.dismiss();
}

  setImageGallery() {
    return new Promise((resolve, reject) => {
      this.camera.getPicture(this.optionGallery).then((url) => {
        this.url = "data:image/jpeg;base64," + url;
        resolve(true)
      })
    }) 
  }



  PostPhoto(){
    if (this.url) {  
      // this.progressBar.start()
      this.imageService.uploadUserPictures(this.url).then((url) => {
  
        let prms:any={image: url, nom: this.nom, latitude: this.latitude,longitude: this.longitude, ville: this.ville}
        console.log(prms)

        this.api.add_monument(prms).subscribe((res)=>{
          if(res.insertId){
            ///added
          }
          else{
            //something wrong
          }
          }  , err => {
            // error
          });
        
  
  
  
    })
  
  
  
  
  
    }
  }



  
}
