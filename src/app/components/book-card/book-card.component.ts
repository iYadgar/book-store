import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Book} from '../../state/books/book.model';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookCardComponent {
  @Input() book: Book | undefined
  @Input() isInFavorites = false
  @Output() favoritesClicked = new EventEmitter()

  isVisible = false;

  getFavoritesIcon() {
    if (this.isInFavorites) {
      return 'pi pi-heart-fill'
    }
    return 'pi pi-heart'
  }

  onFavoritesClick() {
    this.favoritesClicked.emit()
  }

  onShowModal() {
    this.isVisible = true
  }

}
