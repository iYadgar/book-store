import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {combineLatest, debounceTime, Observable, Subject, Subscription, takeUntil} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {Book} from '../../state/books/book.model';
import {BooksService} from '../../state/books/books.service';
import {BooksQuery} from '../../state/books/books.query';
import {GetBooksParams, PaginationModel} from '../../types';
// AsyncPipe:
// 1. subscribe - subscribing to the observable
// 2. unsubscribe - when the component is destroyed unsubscribe is being called
// 3. calls mark for check -

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchPageComponent implements OnDestroy, OnInit {
  onDestroy$: Subject<boolean>;
  presentedBooks$: Observable<Book[]>;
  paginationModel$: Observable<PaginationModel>
  isFetchingBooks$: Observable<boolean>;
  totalQueriedBooks$: Observable<number>
  booksSearchTerm: FormControl;

  constructor(private router: Router, private route: ActivatedRoute, private booksService: BooksService, public booksQuery: BooksQuery,
    private cdr: ChangeDetectorRef) {
    this.cdr.markForCheck() // setState

    this.booksSearchTerm = new FormControl();
    this.onDestroy$ = new Subject<boolean>()
    this.presentedBooks$ = this.booksQuery.selectVisibleBooks$
    this.isFetchingBooks$ = this.booksQuery.selectLoadings$
    this.paginationModel$ = this.booksQuery.selectPaginationModel$
    this.totalQueriedBooks$ = this.booksQuery.selectTotalQueriedBooks$
    combineLatest([
      this.booksSearchTerm.valueChanges.pipe(
        debounceTime(300),
      ), this.paginationModel$]
    ).pipe(
      takeUntil(this.onDestroy$)).subscribe(([term, pagination]) => {
      this.updateQueryParam(term)
      this.booksService.setLoading(true)
      this.updateBooks({
        term,
        maxResults: pagination.rows,
        startIndex: pagination.first
      }).pipe(takeUntil(this.onDestroy$)).subscribe(() => {
        this.booksService.setLoading(false);
      })

    })
    // this.presentedBooks$.subscribe(()=>{
    //     this.cdr.markForCheck()
    // })
    // // useEffect(()=>{setState()},[presentedBooks])

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(({q}) => {
      if (q) {
        this.booksSearchTerm.setValue(q)
      }
    }).unsubscribe();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true)
  }

  updateQueryParam(q: string) {
    this.router.navigate(
      [],
      {
        queryParams: {q},
        queryParamsHandling: 'merge',
      });
  }


  updateBooks(params: GetBooksParams) {
    const subscription = this.booksService.getBooks(params).subscribe(() => {
    })
    subscription.unsubscribe()
    return this.booksService.getBooks(params)
  }

  toggleFavorites(book: Book) {
    this.booksService.toggleFavorites(book)
  }

  getIsBookInFavorites(book: Book) {
    return this.booksQuery.getIsBookInFavorites(book)
  }

  handlePageChange(pagination: PaginationModel) {
    this.booksService.setPaginationModel(pagination)
  }
}
