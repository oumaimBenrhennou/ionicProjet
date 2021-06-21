


import { NavParams, ModalController} from '@ionic/angular';
import { ApiService } from './../../services/api.service'; 
import { DataService } from 'src/app/services/data.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImageService } from 'src/app/services/image.service';

import { Component, OnInit, NgZone } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';

 
@Component({ 
  selector: 'app-visit',
  templateUrl: './add-visit.page.html',
  styleUrls: ['./add-visit.page.scss'],
})
export class AddVisitPage implements OnInit { 
  public monumentId;
  public description = '';
  monument = {
    nom: '',
    ville : '',
    latitude: '',
    longitude: ''
  }

  private optionGallery: CameraOptions;
  public storageref; public url;

  constructor(
    private navParam: NavParams,
    private modalCtrl: ModalController,
    public api: ApiService,
    public loading : LoadingService,
    private DataService: DataService,
    private camera: Camera,
    private imageService: ImageService,
    public ngZone: NgZone,

  ) {
   
    this.monumentId = this.navParam.get('monumentId'); 
    
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


  get_username(){
    return new Promise((resolve, reject) => {
      let nom = '';
      if(this.DataService.user){
        if(this.DataService.user.username){
        resolve(this.DataService.user.username)
        }

      }
      else{
        this.DataService.get().then((user)=>{
          console.log(user)
          resolve(user.username)
        }).catch(()=>{
          resolve('')
        })
      }
    }) 
  }



  PostVisit(){
    if (this.url) {  
      // this.progressBar.start()
      this.loading.show()
      this.imageService.uploadUserPictures(this.url).then((url) => {
      this.get_username().then((username)=>{
         console.log(username)
        let prms:any={image: url, nom: username, id: this.monumentId,description: this.description}
        console.log(prms)

        this.api.add_visit(prms).subscribe((res)=>{
          if(res.status == 'good'){
            ///added
            console.log('added')
            this.loading.hide();
          }
          else{
            //something wrong
            console.log('not added')
            this.loading.hide();
          }
          }  , err => {
            // error
            this.loading.hide()
          });


      })
       
        
  
  
  
    })
  
  
  
  
  
    }
  }



  
}
