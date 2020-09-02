import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoeudPage } from './noeud.page';

const routes: Routes = [
  {
    path: '',
    component: NoeudPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoeudPageRoutingModule {}
