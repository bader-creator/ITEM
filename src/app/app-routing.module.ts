import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'storage',
    loadChildren: () => import('./storage/storage.module').then(m => m.StoragePageModule)
  },
  {
    path: 'audit',
    loadChildren: () => import('./audit/audit.module').then(m => m.AuditPageModule)
  },
  {
    path: 'noeud',
    loadChildren: () => import('./noeud/noeud.module').then(m => m.NoeudPageModule)
  },
  {
    path: 'google-maps/:latitude/:longitude',
    loadChildren: () => import('./google-maps/google-maps.module').then(m => m.GoogleMapsPageModule)
  },
  {
    path: 'btsacceptance/:idSite',
    loadChildren: () => import('./btsacceptance/btsacceptance.module').then(m => m.BTSAcceptancePageModule)
  },
  {
    path: 'gallery-site',
    loadChildren: () => import('./gallery-site/gallery-site.module').then(m => m.GallerySitePageModule)
  },
  {
    path: 'commentes-quizz',
    loadChildren: () => import('./commentes-quizz/commentes-quizz.module').then(m => m.CommentesQuizzPageModule)
  },
  {
    path: 'stock',
    loadChildren: () => import('./stock/stock.module').then(m => m.StockPageModule)
  },









];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
