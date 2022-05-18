import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookCardComponent} from './book-card.component';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {RippleModule} from 'primeng/ripple';
import {DialogModule} from 'primeng/dialog';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [BookCardComponent],
  exports: [
    BookCardComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    RippleModule,
    DialogModule,
    RouterModule
  ]
})
export class BookCardModule {
}
