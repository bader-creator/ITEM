import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoeudPageRoutingModule } from './noeud-routing.module';
import { ListeRegionsPage } from '../liste-regions/liste-regions.page'
import { NoeudPage } from './noeud.page';
import { InfoNoeudPage } from '../info-noeud/info-noeud.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NoeudPageRoutingModule
  ],
  declarations: [NoeudPage, ListeRegionsPage, InfoNoeudPage],
  entryComponents: [ListeRegionsPage, InfoNoeudPage],
})
export class NoeudPageModule { }
