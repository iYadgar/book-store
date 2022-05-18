import {Injectable} from '@angular/core';
import {EntityState, EntityStore, StoreConfig} from '@datorama/akita';
import {Book} from './book.model';

export interface BooksState extends EntityState<Book> {
  books: Book[];
  favorites: Book[];
  totalQueriedBooks: number;
  paginationModel: {
    first: number
    page: number
    pageCount: number
    rows: number
  }
}

function createInitialState(): BooksState {
  return {
    books: [],
    favorites: [],
    paginationModel: {page: 0, first: 0, pageCount: 0, rows: 20},
    totalQueriedBooks: 0
  };
}

@Injectable({providedIn: 'root'})
@StoreConfig({name: 'books'})
export class BooksStore extends EntityStore<BooksState> {

  constructor() {
    super(createInitialState());
  }

}
