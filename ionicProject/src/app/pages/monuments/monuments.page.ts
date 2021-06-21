

import { Component, OnInit, NgZone, OnDestroy, Input, ElementRef, Renderer2, ViewChild} from '@angular/core';
import { AddMonumentPage } from '../addmonument/addmonument.page'
 

import { MenuController, ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { EventsService } from 'src/app/services/events.service';
import { NavigationExtras, Router } from '@angular/router';


declare var google: any;

interface Marker {
  position: {
    lat: number,
    lng: number,
  };
  title: string;
}

 
@Component({
  selector: 'app-monuments',
  templateUrl: './monuments.page.html',
  styleUrls: ['./monuments.page.scss'],
})

export class MonumentsPage implements OnInit {
  ///////
  public monuments;
  public map = null;
  public markers: Marker[] = [];


  mode = 'messages'
  currenttab = 2;
  opts = {
    icon: false,
    label: true,
    toolbarPos: 'top',
    scrollable: true,
  };
 

  constructor(public api: ApiService,public menuCtrl: MenuController,public ngZone: NgZone, private router: Router, 
    private modalCtrl: ModalController) {
      console.log('lkjsdklfj')
  }

  ngOnInit() {
    this.api.get_monuments().subscribe((res)=>{
      if(res.length){
        console.log(res)
        this.markers = [];
        this.monuments = res;
        for(var i = 0; i < res.length ; i ++){
          let obj = {position: { lat: res[i].latitude, lng: res[i].longitude},title: res[i].nom}
          console.log(obj)
          this.markers.push(obj)
        }
        console.log(this.markers)
        this.loadMap();
      }
    })
    
  }


  open_monument(monument){
    let navigationExtras: NavigationExtras = {
      queryParams: {
          "id": monument.id,
          "image": monument.img,
          "latitude": monument.lat,
          "longitude": monument.lng,
          "ville": monument.ville,
          "title": monument.nom
      }
     };
     this.router.navigate(["monument"], navigationExtras);
  }


 get_image(index){
   if(this.monuments[index].img.startsWith('http')){
     return this.monuments[index].img;
   }
   else{
    return 'https://khadijaexpress.herokuapp.com/'+this.monuments[index].img;
   }
 }

  async add() {
    const modal = await this.modalCtrl.create({
      component: AddMonumentPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  loadMap() {
    // create a new map by passing HTMLElement
    const mapEle: HTMLElement = document.getElementById('map');
    // create LatLng object
    const myLatLng = {lat: 30.4278, lng: -9.59811};
    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 3
    });

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      this.renderMarkers();
      mapEle.classList.add('show-map');
    });
  }

  renderMarkers() {
    this.markers.forEach(marker => {
      this.addMarker(marker);
    });
  }

  addMarker(marker: Marker) {
    return new google.maps.Marker({
      position: marker.position,
      map: this.map,
      title: marker.title
    });
  }

}
