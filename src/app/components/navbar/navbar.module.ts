import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavbarComponent} from './navbar.component';
import {ButtonModule} from 'primeng/button';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [NavbarComponent],
  exports: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    RouterModule
  ]
})
export class NavbarModule {
}
