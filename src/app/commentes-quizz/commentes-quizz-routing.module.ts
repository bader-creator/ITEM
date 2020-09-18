import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommentesQuizzPage } from './commentes-quizz.page';

const routes: Routes = [
  {
    path: '',
    component: CommentesQuizzPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommentesQuizzPageRoutingModule {}
