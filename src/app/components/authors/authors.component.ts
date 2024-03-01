import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthorsService } from '../../services/authors.service';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { NgbModal, NgbModule } from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: 'app-authors',
  standalone: true,
  imports: [TableModule,
  DialogModule,
  InputTextModule,
  ButtonModule,
  CommonModule,
  ReactiveFormsModule,
  NgbModule
],
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.css'
})
export class AuthorsComponent {
[x: string]: any;
  constructor(private fb:FormBuilder, private authourService:AuthorsService, private modalService: NgbModal){}
  authorForm!: FormGroup;
  updateAuthorForm!: FormGroup;

  errorMessage = '';
  authors: any = [];
  visible: boolean = false;
  visible2: boolean[] = [];
  showDialog() {
    this.visible = true;
}
showDialog2(index:number) {
  this.visible2[index] = true;
}
getAll(){
  this.authourService.getAllAuthors().subscribe((data)=>{
    this.authors=data.data;
    console.log(this.authors)
  })
}

  ngOnInit(){
    this.authorForm= this.fb.group({
      authorName: ['', [Validators.required,Validators.minLength(5)]],
      firstName: ['', [Validators.required, Validators.minLength(5)]],
      lastName: ['', [Validators.required, Validators.minLength(5)]],
      dob :['', [Validators.required]],
      photo:['', [Validators.required]]
    })
    this.updateAuthorForm= this.fb.group({
      authorName: ['', [Validators.required,Validators.minLength(5)]],
      firstName: ['', [Validators.required, Validators.minLength(5)]],
      lastName: ['', [Validators.required, Validators.minLength(5)]],
      dob :['', [Validators.required]],

    })
    this.getAll()
    this.authors.forEach(() => this.visible2.push(false));
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
  
  addAuthor(){
    if (!this.selectedImage) {
      console.error('No image selected');
      return;
    }
    const formData = new FormData();
    const formValue = this.authorForm.value;
    formData.append("firstName", formValue.firstName);
    formData.append("lastName", formValue.lastName);
    formData.append("dob", formValue.dob);
    formData.append("photo", this.selectedImage);
      console.log(formData)
      this.authourService.addbAuthors(formData).subscribe({
        next: data => {
          console.log(data);
        },
        error: err => {
          this.errorMessage = err.error.error;
          console.log(err);
        }
      });
  }
  DeleteAuthor(id:string){
    this.authourService.deleteAuthors(id).subscribe((data)=>{
      console.log(data)
      this.getAll();
    })
    
  }

  updateAuthor(): void {
    const id = this.selectedAuthor._id;
    console.log(id);
    const formData = this.updateAuthorForm.value;

    this.authourService.updateAuthors(id, formData).subscribe({
      next: data => {
        console.log(data);
        this.getAll();
         
      },
      error: err => {
        console.error(err);
       
      }
    });
  }
  selectedAuthor: any = {};

  openUpdateAuthorModal(content: any, author: any): void {
    this.selectedAuthor=author
    this.updateAuthorForm.patchValue({
      firstName: author.firstName,
      lastName: author.lastName,
      dob: new Date(author.dob),
    });
    
    this.modalService.open(content, { centered: true });
  }

}
