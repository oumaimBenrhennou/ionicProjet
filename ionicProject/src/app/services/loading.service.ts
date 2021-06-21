

import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(
    private loadCtrl: LoadingController
  ) { }

  isLoading = false;
  loading: any;
  async show(): Promise<void> {
    this.isLoading = true;
    return await this.loadCtrl.create({
      duration: 4000,
      spinner: "lines-small",
      message: 'Please wait...',
      cssClass: 'custom-class custom-loading'
    }).then(a => {
      a.present()
        .then(() => {
          if (!this.isLoading) {
            a.dismiss();
          }
        });
    });
  }

  async hide() {
    this.isLoading = false;
    return await this.loadCtrl.dismiss();
  }

}
