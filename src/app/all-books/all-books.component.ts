import { Component } from '@angular/core';
import { BooksRequestsService } from '../services/books-requests.service';
import { Book } from '../interfaces/books';
import { MatPaginatorModule } from '@angular/material/paginator'

@Component({
  selector: 'app-all-books',
  standalone: true,
  imports: [  MatPaginatorModule  ],
  templateUrl: './all-books.component.html',
  styleUrl: './all-books.component.css'
})
export class AllBooksComponent {
  books !: Array<Book>;
  currentPage = 1;
  limit = 4;
  totalItems = 0;
  constructor(private booksRequests: BooksRequestsService){}
  ngOnInit(){
    this.getBooks();
  }
onPageChange(page: number) {
    this.currentPage = page;
    this.getBooks();
  }
  getBooks(){
    this.booksRequests.getAllBooks(this.currentPage, this.limit).subscribe(
      (res) =>{ 
      console.log(res.data)
      this.books = res.data.books
      this.totalItems = res.data.total
    }
    );
  }
  
}
