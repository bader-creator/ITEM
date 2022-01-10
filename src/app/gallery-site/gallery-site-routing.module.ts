import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GallerySitePage } from './gallery-site.page';

const routes: Routes = [
  {
    path: '',
    component: GallerySitePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GallerySitePageRoutingModule {}
