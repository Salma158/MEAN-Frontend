import { Component } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { NgbModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    TableModule,
    DialogModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    CommonModule,
    NgbModule
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  constructor (private categoryService :CategoryService, private modalService: NgbModal){}
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
  showDialog() {
    this.visible = true;
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
  updateCategory(){
    
    this.categoryService.updateCategory(this.selectedCategory._id, this.selectedCategory.name).subscribe((data)=>{
      console.log(data)
      this.getAll()
    
    })

  }
  selectedCategory: any = {};
  openUpdateCategoryModal(content: any, categoryId: number): void {
    console.log("Category ID:", categoryId); 
    this.selectedCategory = { _id: categoryId }; 
    this.modalService.open(content, { centered: true });
}
}
