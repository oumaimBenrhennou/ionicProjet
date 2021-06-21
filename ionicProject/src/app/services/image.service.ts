


import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { finalize } from 'rxjs/operators';
import { ApiService } from './../services/api.service'; 
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';  
@Injectable({
  providedIn: 'root'
})
export class ImageService {
 

  private groupPhotoOption: CameraOptions;

  constructor(
    private camera: Camera,
    public api: ApiService,
    private afstorage: AngularFireStorage,
    public angularDb: AngularFireDatabase,
    public firestore: AngularFirestore
  ) {
    this.groupPhotoOption = {
      quality: 100,
      targetHeight: 800,
      targetWidth: 800,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true,
      allowEdit: true
    }


  }






  imgURItoBlob(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {
      type: mimeString
    });
  }

  generateFilename() {
    var length = 10;
    var text = "";
    var possible = "ABaCDE3xFGHIJgKLM5NhOP1QiRSTuUV0WlXYZkabncdebfgdhijqklamnozpqrwstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text + ".jpg";
  }


 


    
  uploadUserPictures(url) {
    return new Promise((resolve, reject) => {
      let imgBlob = this.imgURItoBlob(url);
      let metadata = { 
        'contentType': imgBlob.type
      };
      var generated = this.generateFilename(); 
      const ref = this.afstorage.ref('photos/' + generated)
      const task = ref.put(imgBlob, metadata)
      //let percent : any = task.percentageChanges();
      task.snapshotChanges().pipe(
        finalize(async () => {
          let url = ref.getDownloadURL().toPromise();
          resolve(url);
        })
      ).subscribe()
    })
  }







}
