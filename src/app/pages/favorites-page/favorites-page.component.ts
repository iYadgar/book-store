import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Book} from '../../state/books/book.model';
import {BooksService} from '../../state/books/books.service';
import {BooksQuery} from '../../state/books/books.query';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesPageComponent {
  favorites$: Observable<Book[]>

  constructor(private booksQuery: BooksQuery, private booksService: BooksService) {
    this.favorites$ = this.booksQuery.selectFavoriteBooks$
    // @ts-ignore
    window['favorites'] = this.favorites$
  }

  getIsBookInFavorites(book: Book) {
    return this.booksQuery.getIsBookInFavorites(book)
  }

  toggleFavorites(book: Book) {
    this.booksService.toggleFavorites(book)
  }
}
