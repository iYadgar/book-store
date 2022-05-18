import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FavoritesPageComponent} from './favorites-page.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: FavoritesPageComponent}
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class FavoritesPageRoutingModule {
}
