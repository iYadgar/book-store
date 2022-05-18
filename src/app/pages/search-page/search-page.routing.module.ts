import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SearchPageComponent} from './search-page.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: SearchPageComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class SearchPageRoutingModule { }
