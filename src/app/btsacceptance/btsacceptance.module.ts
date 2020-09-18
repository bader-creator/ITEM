import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BTSAcceptancePageRoutingModule } from './btsacceptance-routing.module';

import { BTSAcceptancePage } from './btsacceptance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BTSAcceptancePageRoutingModule
  ],
  declarations: [BTSAcceptancePage]
})
export class BTSAcceptancePageModule {}
