import { Component } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router'
import { PopularComponent } from '../popular/popular.component';
@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [RouterLink, PopularComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  booksData: Array<any> = [];
  currentPage = 1;
   limit = 10;
   userId = '65d9abb351fcf55837d66df8';
   status! : string;
   totalPages: number[] = [1,2,3];

   
  constructor(private booksService: BooksService, private router : Router) {}

    ngOnInit(): void {
    this.getUserBooks()
    this.calculateTotalPages();
    
  }


  getBooksByStatus(status: string) {
    this.status = status; // Set the status

    if (status) {
        this.currentPage = 1;
    }

    this.booksService.getBooksByStatus(this.userId, status, this.currentPage, this.limit).subscribe({
        next: (res: any) => {
            this.booksData = res.data.userBooks;
            this.calculateTotalPages();
        },
        error: (error: any) => {
            console.log('Error fetching books:', error);
            this.booksData = [];
        }
    }); 
}


  sendUserBook(id: string) {
    this.router.navigate([`/book-details/${id}`]);
  }

    calculateTotalPages() {
    const totalBooks = this.booksData.length;
    const totalPages = Math.ceil(totalBooks / this.limit);
    this.totalPages = Array.from({length: totalPages}, (_, i) => i + 1);
  }

    onPageChange(page: number): void {
    this.currentPage = page;
    this.getBooksByStatus(this.status);
  }


    getUserBooks(){
    this.booksService.getUserBooks(this.userId).subscribe({
      next: (res: any) => {
        this.booksData = res.data.userBooks;
        this.calculateTotalPages();
        console.log(this.userId)
        console.log(this.booksData)
      },
      error: (error: any) => {
        console.error('Error fetching books:', error);
      }
    })
  }
}












