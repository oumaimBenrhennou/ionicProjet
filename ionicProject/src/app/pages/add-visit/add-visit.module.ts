import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {AutosizeModule} from 'ngx-autosize';
import { IonicModule } from '@ionic/angular';
import {  ReactiveFormsModule } from '@angular/forms';
import { AddVisitPage } from './add-visit.page';
//import { IonBottomDrawerModule } from '../../modules/ion-bottom-drawer/ion-bottom-drawer.module';

import { TimeAgoModule } from 'src/app/timeDecleration/time-ago.module';
//import { SlideDrawerLikesComponent } from '../slide-drawer-likes/slide-drawer-likes.component'

const routes: Routes = [
  {
    path: '',
    component: AddVisitPage
  }
];

@NgModule({
  imports: [
    AutosizeModule,
    CommonModule,
    TimeAgoModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddVisitPage]
})
export class AddVisitPageModule {}
