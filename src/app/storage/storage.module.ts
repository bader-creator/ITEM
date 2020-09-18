import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
import { EditInfoSitePage } from '../edit-info-site/edit-info-site.page'
import { IonicModule } from '@ionic/angular';

import { StoragePageRoutingModule } from './storage-routing.module';

import { StoragePage } from './storage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoragePageRoutingModule,
    SuperTabsModule
  ],
  declarations: [StoragePage, EditInfoSitePage],
  entryComponents: [EditInfoSitePage],
})
export class StoragePageModule { }
