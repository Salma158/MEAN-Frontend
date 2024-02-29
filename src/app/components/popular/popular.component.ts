import { Component } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
 import { faStar } from '@fortawesome/free-solid-svg-icons';



@Component({
  selector: 'app-popular',
  standalone: true,
  imports: [RouterLink, FontAwesomeModule],
  templateUrl: './popular.component.html',
  styleUrl: './popular.component.css'
})
export class PopularComponent {

  faStar = faStar;


  constructor( private BooksService : BooksService){}

  popularBooks! : Array<any>
  popularAuthors! : Array<any>
  popularCategories! : Array<any>

  ngOnInit() {
    this.getPopularBooks()
    this.getPopularAuthors()
    this.getPopularCategories()
  }

  getPopularAuthors() {
    this.BooksService.getPopularAuthors().subscribe({
      next: (res: any) => {
         this.popularAuthors = res.popularAuthors
      },
      error: (error: any) => {
        console.error('Error fetching popular authors:', error);
      }
     }) 
  }

  getPopularCategories(){
    this.BooksService.getPopularCategories().subscribe({
      next: (res: any) => {
        this.popularCategories = res.popularCategories
      },
      error: (error: any) => {
        console.error('Error fetching popular categories:', error);
      }
     }) 
  }

  getPopularBooks(){
    this.BooksService.getPopularBooks().subscribe({
      next: (res: any) => {
        this.popularBooks = res.data.popularBooks
        console.log(this.popularBooks)
        
      },
      error: (error: any) => {
        console.error('Error fetching popular book:', error);
      }
     }) 
  }
  getStars(avgRating: number): number[] {
    const roundedRating = Math.round(avgRating);
    return Array.from({ length: roundedRating }, () => 1);
  }
}
