import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/search-page/search-page.module').then(
        (m) => m.SearchPageModule
      ),
  },
  {
    path: 'favorites',
    loadChildren: () =>
      import('./pages/favorites-page/favorites-page.module').then(
        (m) => m.FavoritesPageModule
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
