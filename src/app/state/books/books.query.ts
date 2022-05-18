import {Injectable} from '@angular/core';
import {arrayFind, QueryEntity} from '@datorama/akita';
import {BooksState, BooksStore} from './books.store';
import {Book} from './book.model';

@Injectable({providedIn: 'root'})
export class BooksQuery extends QueryEntity<BooksState> {
  selectVisibleBooks$ = this.select(({books}) => books);
  selectFavoriteBooks$ = this.select(({favorites}) => favorites);
  selectLoadings$ = this.select(({loading}) => loading || false);
  selectPaginationModel$ = this.select(({paginationModel}) => paginationModel)
  selectTotalQueriedBooks$ = this.select(({totalQueriedBooks}) => totalQueriedBooks)

  constructor(protected override store: BooksStore) {
    super(store);
  }

  getIsBookInFavorites(book: Book) {
    return this.selectFavoriteBooks$.pipe(arrayFind(book.id))
  }

}
