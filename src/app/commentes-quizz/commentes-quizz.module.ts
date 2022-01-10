import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommentesQuizzPageRoutingModule } from './commentes-quizz-routing.module';

import { CommentesQuizzPage } from './commentes-quizz.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommentesQuizzPageRoutingModule
  ],
  declarations: [CommentesQuizzPage]
})
export class CommentesQuizzPageModule {}
