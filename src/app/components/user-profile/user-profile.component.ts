import { Component } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { PopularComponent } from '../popular/popular.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [RouterLink, PopularComponent, MatPaginatorModule, FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent {
  booksData: Array<any> = [];
  allBooksData: Array<any> = [];
  currentPage = 1;
  limit = 2;
  userId!: string;
  status!: string;
  totalItems = 0;
  searched!: string;
  searchedbooks!: Array<any>;

  constructor(private booksService: BooksService, private router: Router) {}

  ngOnInit() {
    this.userId = JSON.parse(window.localStorage.getItem('userId') || '');
    this.booksService.getAllBooksPaginated(this.currentPage, this.limit).subscribe({
      next: (res: any) => {
        this.allBooksData = res.data.books;
      },
      error: (error: any) => {
        console.error('Error getting books', error);
      },
    });
  }

  sendUserBook(id: string) {
    this.router.navigate([`/book-details/${id}`]);
  }

  searchBook() {
    this.booksService.searchBook(this.searched).subscribe({
      next: (res: any) => {
        console.log(res);
        this.searchedbooks = res.data.books;
        this.booksData = [];
        this.allBooksData = [];
      },
      error: (error: any) => {
        console.error('Error searching book', error);
      },
    });
  }

  getBooks(): void {
    this.booksService
      .getBooksByStatus(this.userId, this.status, this.currentPage, this.limit)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.booksData = res.data.userBooks;
          this.totalItems = res.data.total;
          console.log(this.booksData);
          this.searchedbooks = [];
          this.booksData = [];
        },
        error: (error: any) => {
          console.error('Error fetching books', error);
        },
      });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getBooks();
  }

  changeStatus(newStatus: string) {
    this.status = newStatus;
    console.log(this.status);
    this.currentPage = 1;
    this.getBooks();
  }
}
