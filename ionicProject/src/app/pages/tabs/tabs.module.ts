


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      
      { path: 'monuments', loadChildren: () => import('../monuments/monuments.module').then(m => m.MonumentsPageModule) },
      { path: 'etudiants', loadChildren: () => import('../etudiants/etudiants.module').then(m => m.EtudiantsPageModule) }

    ]
  },
  {
    path: '',
    redirectTo: 'tabs/monuments',
    pathMatch: 'full'

  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule { }
