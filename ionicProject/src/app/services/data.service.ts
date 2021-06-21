

import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
 

@Injectable({ 
  providedIn: 'root'
})
export class DataService {

public user;
  /////////////////

  constructor(private nativeStorage: NativeStorage
  ) { }


add(user){
  return this.nativeStorage.setItem('user', user)
  // .then(
  //   () => console.log('Stored item!'),
  //   error => console.error('Error storing item', error)
  // );
}

get(){
   return this.nativeStorage.getItem('user')
  // .then(
  //   data => console.log(data),
  //   error => console.error(error)
  // );
}

}
