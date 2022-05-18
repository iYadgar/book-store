import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchPageComponent} from './search-page.component';
import {SearchPageRoutingModule} from './search-page.routing.module';
import {InputTextModule} from 'primeng/inputtext';
import {BookCardModule} from '../../components/book-card/book-card.module';
import {ReactiveFormsModule} from '@angular/forms';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {PaginatorModule} from 'primeng/paginator';


@NgModule({
	imports: [CommonModule, SearchPageRoutingModule, InputTextModule, BookCardModule, ReactiveFormsModule, ProgressSpinnerModule, PaginatorModule],
  declarations: [SearchPageComponent],
})
export class SearchPageModule {
}
