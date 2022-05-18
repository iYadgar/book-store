import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FavoritesPageComponent} from './favorites-page.component';
import {FavoritesPageRoutingModule} from './favorites-page.routing.module';
import {BookCardModule} from '../../components/book-card/book-card.module';

@NgModule({
	imports: [CommonModule, FavoritesPageRoutingModule, BookCardModule],
  declarations: [FavoritesPageComponent],
})
export class FavoritesPageModule {
}
