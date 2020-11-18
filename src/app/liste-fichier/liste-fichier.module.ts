import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListeFichierPageRoutingModule } from './liste-fichier-routing.module';

import { ListeFichierPage } from './liste-fichier.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListeFichierPageRoutingModule
  ],
  declarations: [ListeFichierPage]
})
export class ListeFichierPageModule {}
