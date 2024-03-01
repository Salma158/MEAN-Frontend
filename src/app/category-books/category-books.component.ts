import { Component, Input, input } from '@angular/core';
import { CategoriesRequestsService } from '../services/categories-requests.service';
import { Category } from '../interfaces/category';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../interfaces/books';
import { MatPaginatorModule } from '@angular/material/paginator'


@Component({
  selector: 'app-category-books',
  standalone: true,
  imports: [MatPaginatorModule],
  templateUrl: './category-books.component.html',
  styleUrl: './category-books.component.css'
})

export class CategoryBooksComponent {
  books !: Array<Book>;
  categories !: Array<Category>
  currentPage = 1;
  limit = 2;
  totalItems = 0;
  constructor(private categoriesRequests: CategoriesRequestsService, private route: ActivatedRoute ){}
  ngOnInit(){
    this.getCategoryBooks();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getCategoryBooks();
  }
  getCategoryBooks(){
    const id = this.route.snapshot.params['id'];
    this.categoriesRequests.getCategoryDetails(id, this.currentPage, this.limit).subscribe(
      (res) =>{ 
        console.log(res)
        this.books = res.data.books
        this.totalItems = res.data.total
    }
    );
  }

}
