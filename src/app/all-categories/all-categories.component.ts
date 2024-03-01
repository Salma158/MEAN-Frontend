import { Component } from '@angular/core';
import { CategoriesRequestsService } from '../services/categories-requests.service';
import { Category } from '../interfaces/category';

@Component({
  selector: 'app-all-categories',
  standalone: true,
  imports: [],
  templateUrl: './all-categories.component.html',
  styleUrl: './all-categories.component.css'
})
export class AllCategoriesComponent {
  categories !: Array<Category>;
  constructor(private categoriesRequests: CategoriesRequestsService){}
  ngOnInit(){
    this.categoriesRequests.getAllCategories().subscribe(
      (res) =>{ 
      console.log(res)
      this.categories = res.data
    }
    );
  }
}
