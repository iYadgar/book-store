import {Injectable} from '@angular/core';
import {BooksStore} from './books.store';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs';
import {Book} from './book.model';
import {arrayAdd, arrayRemove} from '@datorama/akita';
import {API_KEY} from '../../config';
import {LOCAL_STORAGE_KEYS} from '../../constants';
import {GetBooksParams, PaginationModel} from '../../types';

interface ApiResponse {
  kind: string,
  totalItems: number,
  items: Book[],
}

@Injectable({providedIn: 'root'})
export class BooksService {
  baseUrl = 'https://www.googleapis.com/books/v1/volumes'

  constructor(protected store: BooksStore, private http: HttpClient) {
    this.setLoading(false)
    const favorites = localStorage.getItem(LOCAL_STORAGE_KEYS.FAVORITES)
    if (favorites) {
      const {favorites: parsedFavorites} = JSON.parse(favorites)
      this.setFavorites(parsedFavorites)
    }

  }

  getBooks({maxResults, startIndex, term}: GetBooksParams) {
    return this.http.get<ApiResponse>(`${this.baseUrl}?q=${term}&maxResults=${maxResults}&startIndex=${startIndex}&key=${API_KEY}`,).pipe(tap((res) =>
      this.store.update((state) => {
        return ({
          ...state,
          books: res.items,
          totalQueriedBooks: res.totalItems
        });
      })))

  }

  setLoading(value: boolean) {
    this.store.setLoading(value)
  }


  toggleFavorites(book: Book) {
    this.store.update(({favorites}) => {
      const isBookInFavorites = favorites.some((b) => b.id === book.id)
      let updatedFavorites;
      if (isBookInFavorites) {
        updatedFavorites = ({favorites: arrayRemove(favorites, (b) => b.id === book.id)});
      } else {
        updatedFavorites = ({favorites: arrayAdd(favorites, book)});
      }
      localStorage.setItem(LOCAL_STORAGE_KEYS.FAVORITES, JSON.stringify(updatedFavorites))
      return updatedFavorites
    })
  }

  setFavorites(favorites: Book[]) {
    this.store.update((state) => ({...state, favorites}))
  }

  setPaginationModel(paginationModel: PaginationModel) {
    this.store.update((state) => ({paginationModel}))
  }

}
