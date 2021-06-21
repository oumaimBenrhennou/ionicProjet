
import { LogoutService } from './services/logout.service';
import { EventsService } from './services/events.service';
import { ImageService } from './services/image.service'; 
import { AddMonumentPageModule } from './pages/addmonument/addmonument.module'
import { LoadingService } from './services/loading.service';

import { LoginService } from './services/login.service'; 
import { MonumentsPageModule } from './pages/monuments/monuments.module';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { MonumentPageModule } from './pages/monument/monument.module'
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { environment } from './../environments/environment.prod';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Camera } from '@ionic-native/camera/ngx';
import { QuicklinkModule } from 'ngx-quicklink';
import { AngularFireModule } from '@angular/fire'
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database'; 
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { File } from '@ionic-native/file/ngx';
import { AddVisitPageModule } from './pages/add-visit/add-visit.module';


import { TimeAgoModule } from './timeDecleration/time-ago.module';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';

import { ReactiveFormsModule } from '@angular/forms';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard'; 




AngularFireModule.initializeApp(environment.firebaseConfig)



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [ 
    BrowserModule,
    HttpClientModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireStorageModule,
    NgxIonicImageViewerModule,
    MonumentsPageModule,
    ReactiveFormsModule,
    AngularFireAuthGuardModule,
    MonumentPageModule,
    AddVisitPageModule,
    AddMonumentPageModule,
    BrowserAnimationsModule,
    TimeAgoModule, 
    QuicklinkModule,
  ],
  providers: [
    AngularFireModule,
    AngularFireAuthModule,
    AngularFireAuth,
    LoginService,
    LoadingService,
    ImageService,
    EventsService,
    LogoutService,
    StatusBar,
    ImagePicker,
    Geolocation,
    NativeStorage,
    Camera,
    Diagnostic,
    LocationAccuracy,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    File,
    ImagePicker,
    AndroidPermissions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
