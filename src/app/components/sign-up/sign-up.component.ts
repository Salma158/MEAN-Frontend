import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import {customValidators} from '../../validations/validator'
import { AuthService } from '../../services/auth.service';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CardModule,
  InputTextModule,
  PasswordModule,
  ButtonModule,
  CommonModule,
  ReactiveFormsModule,
  FileUploadModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  constructor(private fb:FormBuilder, private authService: AuthService){}
  registerForm!: FormGroup;

  ngOnInit(){
    this.registerForm= this.fb.group({
      userName: ['', [Validators.required,Validators.minLength(5), customValidators.noSpaceValidator()]],
      firstName: ['', [Validators.required, Validators.minLength(5)]],
      lastName: ['', [Validators.required, Validators.minLength(5)]],
      email :['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), customValidators.passwordValidation()]],
      photo:['', [Validators.required]]
    })
  }
  errorMessage = '';
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
  
   register() {
    if (!this.selectedImage) {
      console.error('No image selected');
      return;
    }
    const formData = new FormData();
    const formValue = this.registerForm.value;
    formData.append("userName", formValue.userName);
    formData.append("firstName", formValue.firstName);
    formData.append("lastName", formValue.lastName);
    formData.append("email", formValue.email);
    formData.append("password", formValue.password);
    formData.append("photo", this.selectedImage);
      console.log(formData)
     this.authService.signUp(formData).subscribe({
      next: data => {
        console.log(data);
      },
      error: err => {
        this.errorMessage = err.error.error;
        console.log(err);
      }
    });
  }
}
