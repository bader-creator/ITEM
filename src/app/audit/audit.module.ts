import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuizzPage } from '../quizz/quizz.page'
import { IonicModule } from '@ionic/angular';

import { AuditPageRoutingModule } from './audit-routing.module';

import { AuditPage } from './audit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuditPageRoutingModule
  ],
  declarations: [AuditPage, QuizzPage],
  entryComponents: [QuizzPage],
})
export class AuditPageModule { }
