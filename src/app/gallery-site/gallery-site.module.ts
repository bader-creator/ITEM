import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GallerySitePageRoutingModule } from './gallery-site-routing.module';

import { GallerySitePage } from './gallery-site.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GallerySitePageRoutingModule
  ],
  declarations: [GallerySitePage]
})
export class GallerySitePageModule {}
