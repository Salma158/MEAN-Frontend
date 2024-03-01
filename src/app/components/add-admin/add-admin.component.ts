import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { customValidators } from '../../validations/validator';
import { PasswordModule } from 'primeng/password';
@Component({
  selector: 'app-add-admin',
  standalone: true,
  imports: [
    TableModule,
    DialogModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    CommonModule,
    ReactiveFormsModule,
    PasswordModule
  ],
  templateUrl: './add-admin.component.html',
  styleUrl: './add-admin.component.css'
})
export class AddAdminComponent {
  visible: boolean = false;
  showDialog() {
    this.visible = true;
}
constructor(private fb:FormBuilder, private authService: AuthService){}
registerForm!: FormGroup;

ngOnInit(){
  this.registerForm= this.fb.group({
    userName: ['', [Validators.required,Validators.minLength(5), customValidators.noSpaceValidator()]],
    firstName: ['', [Validators.required, Validators.minLength(5)]],
    lastName: ['', [Validators.required, Validators.minLength(5)]],
    email :['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), customValidators.passwordValidation()]],
    photo:['', [Validators.required]],
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
addAdmin() {
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
  formData.append("role", 'admin');

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
