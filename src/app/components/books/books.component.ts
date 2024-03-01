import { Component, NgModule } from '@angular/core';
import { BooksService } from '../../services/books.service';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { NgbModal,NgbModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-books',
  standalone: true,
  imports: [
    TableModule,
    DialogModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    CommonModule,
    ReactiveFormsModule,
    NgbModule
  ],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent {
    constructor (private fb:FormBuilder ,private booksService :BooksService, private modalService: NgbModal){}
    books= [];
    authors:any = [];
    category:any = [];


    bookForm!: FormGroup;
    updateBookForm!: FormGroup;
    errorMessage = '';
  
    visible: boolean = false;
    showDialog() {
      this.visible = true;
  }

  getAll(){
    this.booksService.getAllBooks().subscribe((data)=>{
      this.books=data.data;
      console.log(this.books)
    })
  }
  getAllCategories(){
    this.booksService.getAllCategories().subscribe((data)=>{
      this.category=data.data;
      console.log(this.category)
    })
  }
  getAllAuthors(){
    this.booksService.getAllAuthors().subscribe((data)=>{
      this.authors=data.data;
      console.log(this.authors)
    })
  }
    ngOnInit(){
      this.bookForm= this.fb.group({
        author: ['', [Validators.required,Validators.minLength(5)]],
        category: ['', [Validators.required, Validators.minLength(5)]],
        name: ['', [Validators.required, Validators.minLength(5)]],
        description :['', [Validators.required]],
        image:['', [Validators.required]]
      })
      this.getAll()
      this.getAllAuthors()
      this.getAllCategories()
      this.updateBookForm= this.fb.group({
        author: ['', [Validators.required,Validators.minLength(5)]],
        category: ['', [Validators.required, Validators.minLength(5)]],
        name: ['', [Validators.required, Validators.minLength(5)]],
        description :['', [Validators.required]]
      })
    }

    selectedImage!: File;
    onUpload(event: any) {
      if (event.target) {
        const files: FileList | null = event.target.files;
        if (files && files.length > 0) {
          this.selectedImage = files[0];
          console.log('Selected File:', this.selectedImage);
        }
      }
    }
    
    addBook(){
      if (!this.selectedImage) {
        console.error('No image selected');
        return;
      }
      const formData = new FormData();
      const formValue = this.bookForm.value;
      formData.append("author", formValue.author);
      formData.append("category", formValue.category);
      formData.append("name", formValue.name);
      formData.append("description", formValue.description);
      formData.append("image", this.selectedImage);
        console.log(formData)
        this.booksService.addbBook(formData).subscribe({
          next: data => {
            console.log(data);
          },
          error: err => {
            this.errorMessage = err.error.error;
            console.log(err);
          }
        });
    }
    DeleteBook(id:string){
      this.booksService.deleteBook(id).subscribe((data)=>{
        console.log(data)
        this.getAll();
      })
      
    }
  
    updateBook(){
      const id = this.selectedBook._id;
      const formData = this.updateBookForm.value;
      this.booksService.updateBook(id,formData).subscribe((data)=>{
        console.log(data)
        this.getAll()
    
      })
    }
    selectedBook: any = {};

    openUpdateBoookModal(content: any, book: any): void {
      this.selectedBook=book
      this.updateBookForm.patchValue({
        author: book.author,
        category: book.category,
        name:book.name,
        description:book.description
        
      });
      
      this.modalService.open(content, { centered: true });
    }
}
