

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MonumentPage } from './monument.page';
import { TimeAgoModule } from '../../timeDecleration/time-ago.module';



const routes: Routes = [
  {
    path: '',
    component: MonumentPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TimeAgoModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [MonumentPage]
})
export class MonumentPageModule {}
