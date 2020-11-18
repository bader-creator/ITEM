import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListeFichierPage } from './liste-fichier.page';

const routes: Routes = [
  {
    path: '',
    component: ListeFichierPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListeFichierPageRoutingModule {}
