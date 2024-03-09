import { Component } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../../services/auth.service';
import { StorageServiceService } from '../../services/storage-service.service';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule,
  CardModule,
  InputTextModule,
  PasswordModule,
  ButtonModule,
  CommonModule
],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  isValid:boolean=true
  constructor( private authService:AuthService , 
    private storageService:StorageServiceService ,
    private router: Router
    ){}
    logInFormValues = {
      userName:'',
      password:''
    }
  errorMessage = '';
  role: string = '';

  logIn(): void {
    const { userName, password } = this.logInFormValues;

    this.authService.logIn(userName, password).subscribe({
      next: data => { 
               const payload:any=jwtDecode(data)
        this.role=payload.role;
        const userId = payload.id;
        this.storageService.saveUser(data, payload.role, userId);
        this.router.navigate(['/dashboard'])
        console.log("hiiii")

      },
      error: err => {
        this.isValid=false
        this.errorMessage = err.error.error;
        
      }
    });
  }
}
