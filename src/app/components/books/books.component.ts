import { Component } from '@angular/core';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent {
    constructor (private booksService :BooksService){}
    books: Array<object> = [];
    
}
