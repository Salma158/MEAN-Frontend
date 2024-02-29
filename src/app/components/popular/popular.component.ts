import { Component } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-popular',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './popular.component.html',
  styleUrl: './popular.component.css'
})
export class PopularComponent {

  constructor( private BooksService : BooksService){}

  popularBooks! : Array<any>
  
  ngOnInit() {
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
}
