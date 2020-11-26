import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoeudPageRoutingModule } from './noeud-routing.module';
import { ListeRegionsPage } from '../liste-regions/liste-regions.page'
import { NoeudPage } from './noeud.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NoeudPageRoutingModule
  ],
  declarations: [NoeudPage, ListeRegionsPage],
  entryComponents: [ListeRegionsPage],
})
export class NoeudPageModule { }
