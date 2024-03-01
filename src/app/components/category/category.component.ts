import { Component } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    TableModule,
    DialogModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    CommonModule
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  constructor (private categoryService :CategoryService){}
  categories: Array<object> = [];
  categoryFormValues = {
    categoryName:'',

  }
  getAll(){
    this.categoryService.getAll().subscribe((data)=>{
      this.categories=data.data;
      console.log(this.categories)
    })
  }
  ngOnInit() {
    this.getAll()
  }
  visible: boolean = false;
  visible2: boolean = false;


  showDialog() {
      this.visible = true;
  }
  showDialog2() {
    this.visible2 = true;
}
  DeleteCategory(id:string){
    this.categoryService.deleteCategory(id).subscribe((data)=>{
      console.log(data)
      this.getAll();
    })
    
  }
  addCategory(){
    const {categoryName} = this.categoryFormValues;
    this.categoryService.addCategory(categoryName).subscribe({
      next: data => {
        console.log(data);
        this.getAll()
      },
      error: err => {
        
        console.log(err);
      }
    })
    
  }
  updateCategory(id:string,categoryName:string){
    console.log(id)
    this.categoryService.updateCategory(id,categoryName).subscribe((data)=>{
      console.log(data)
      this.getAll()
      this.visible2=false
    })
  }
}
