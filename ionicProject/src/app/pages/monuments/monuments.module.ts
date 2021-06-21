
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MonumentsPage } from './monuments.page';
import { TimeAgoModule } from '../../timeDecleration/time-ago.module';

const routes: Routes = [
  {
    path: '',
    component: MonumentsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TimeAgoModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MonumentsPage]
})
export class MonumentsPageModule {}
