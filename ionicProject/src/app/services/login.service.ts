
import { Router } from '@angular/router'; 
import { LoadingService } from './loading.service';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app'; 
import { ApiService } from './../services/api.service';
import { AlertService } from './../services/alert.service';
import { DataService } from './data.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController , ModalController, ToastController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
}) 
export class LoginService {

  username: string = ""
  password: string = ""
  

constructor(
    private loading: LoadingService,
    private alertCtrl: AlertController,
    private router: Router,
    public api: ApiService,
    private alertService: AlertService,
    private toastCtrl: ToastController,
    private DataService: DataService,
    public angulaeDb: AngularFireDatabase,
    public firestore: AngularFirestore
    
    
  ) {
    }



  //Phone Number Login 
  async PhoneNumber(phone, applicationVerifier,userData) {
    this.loading.show();
    console.log(1)
    await new Promise((resolve, reject) => {
      console.log(2)
    // var applicationVerifier = new firebase.default.auth.RecaptchaVerifier(
    //   'recaptcha-container');
    let that = this;

    this.api.login({phone: phone}).subscribe((res)=>{
      console.log(res)
      this.loading.hide()
      if(res.length == 0){
          
      ///// phione number not found in database



        firebase.default.auth().signInWithPhoneNumber(phone, applicationVerifier).then(async (confirmationResult)=>{
          this.loading.hide()
          console.log(3)
          
          let prompt = await this.alertCtrl.create({
            //title: 'Enter the Confirmation code',
            inputs: [{ name: 'confirmationCode', placeholder: 'Confirmation Code' }],
            buttons: [
              { text: 'Cancel',
                handler: data => { console.log('Cancel clicked'); }
              },
              { text: 'Send',
                handler: data => {
                  // Here we need to handle the confirmation code
                  console.log(4)
                  confirmationResult
                  .confirm(data.confirmationCode)
                  .then(function (result) {
                    // User signed in successfully.
                    console.log(5)
                    that.presentToast('Confirmation Accpted',3200);
                    that.loading.show();
                    that.api.adduser(userData).subscribe((res)=>{
                      console.log(res)
                      if(res.insertId){
                        console.log(6)
                        let userid = res.insertId;
                        userData.id = userid;
                        that.DataService.add(userData).then(()=>{
                          that.router.navigateByUrl('/tabs');
                        })
                        
                      }
                    }, error=>{
                      console.log(7)
                      that.presentToast('Something Went Wrong While Creating Account',3200);
                    })
                    // ...
                  })
                  .catch(function (error) {
                    console.log(8)
                    that.presentToast('Confirmation Code Incorrect',3200);
                    // User couldn't sign in (bad verification code?)
                    // ...
                  });
    
    
                }
              }
            ]
          });
          await prompt.present();
          // this.createUserDataGoogle();
        }).catch((error) => {
          console.log(9)
          let code = error["code"];
          this.presentToast(code,3200);
        })




      }
      else if(res.length){

        this.alertService.showAlert('Phone Number already in Use', 'please try to login')
      }

    }, error =>{

    })





   });
  }



  async presentToast(message,delay) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: delay
    });
    toast.present();
  }



  // Login Page
  async login(phone, applicationVerifier) {
    this.loading.show()


        this.api.login({phone: phone}).subscribe((res)=>{
      console.log(res)
      this.loading.hide()
      if(res.length == 0){
          this.alertService.showAlert('user with phone number not found', 'please sign up first')
      }
      else if(res.length){
           
        let that = this;
        firebase.default.auth().signInWithPhoneNumber(phone, applicationVerifier).then(async (confirmationResult)=>{
          this.loading.hide()
          let prompt = await this.alertCtrl.create({
            //title: 'Enter the Confirmation code',
            inputs: [{ name: 'confirmationCode', placeholder: 'Confirmation Code' }],
            buttons: [
              { text: 'Cancel',
                handler: data => { console.log('Cancel clicked'); }
              },
              { text: 'Send',
                handler: data => {
                  // Here we need to handle the confirmation code
    
                  confirmationResult
                  .confirm(data.confirmationCode)
                  .then(function (result) {
                    // User signed in successfully.
                    that.presentToast('Confirmation Accpted',3200);
                    that.router.navigateByUrl('/tabs');
                    // ...
                  })
                  .catch(function (error) {
                    that.presentToast('Confirmation Code Incorrect',3200);
                    // User couldn't sign in (bad verification code?)
                    // ...
                  });
    
    
                }
              }
            ]
          });
          await prompt.present();
          // this.createUserDataGoogle();
        }).catch((error) => {
          let code = error["code"];
          this.presentToast('Something Went Wrong',3200);
        })

        


      }
    }, error=>{
      this.presentToast('Something Went Wrong While Creating Account',3200);
    })
    

    


    // this.api.login({phone: email, password: password}).subscribe((res)=>{
    //   console.log(res)
    //   if(res.status == []){
    //       this.presentToast('user data not found',3000)
    //   }
    //   else if(res.status.length){
           
    //   }
    // }, error=>{
    //   this.presentToast('Something Went Wrong While Creating Account',3200);
    // })
  }




  showAlert(header,message){
    this.alertService.showAlert(header,message)
  }






  
}
