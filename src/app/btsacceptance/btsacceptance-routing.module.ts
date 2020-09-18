import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BTSAcceptancePage } from './btsacceptance.page';

const routes: Routes = [
  {
    path: '',
    component: BTSAcceptancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BTSAcceptancePageRoutingModule {}
