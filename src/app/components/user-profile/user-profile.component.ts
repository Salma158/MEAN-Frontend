import { Component } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router'
import { PopularComponent } from '../popular/popular.component';
import { MatPaginatorModule } from '@angular/material/paginator'
@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [RouterLink, PopularComponent, MatPaginatorModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  booksData: Array<any> = [];
  currentPage = 1;
   limit = 2;
   userId = '65d9abb351fcf55837d66df8';
   status! : string;
   totalItems = 0;

   
  constructor(private booksService: BooksService, private router : Router) {}

  sendUserBook(id: string) {
    this.router.navigate([`/book-details/${id}`]);
  }
  ngOnInit(): void {
   // this.getBooks();
   this.booksService.searchBook("ti").subscribe({
    next: (res: any) => {
      console.log(res)
    },
    error: (error: any) => {
      console.error('Error fetching books', error);
    }
  })
  }

  getBooks(): void {
    this.booksService.getBooksByStatus(this.userId, this.status, this.currentPage, this.limit).subscribe({

      next: (res: any) => {
        console.log(res)
        this.booksData = res.data.userBooks;
        this.totalItems = res.data.total;
        console.log(this.booksData)
      },
      error: (error: any) => {
        console.error('Error fetching books', error);
      }
    })
    
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getBooks();
  }

  changeStatus(newStatus: string) {
    this.status = newStatus;
    console.log(this.status)
    this.currentPage = 1;
    this.getBooks();
  }
}












