import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../../services/auth.service';
import { StorageServiceService } from '../../services/storage-service.service';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [
    FormsModule,
  CardModule,
  InputTextModule,
  PasswordModule,
  ButtonModule,
  CommonModule
  ],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
  photo! : String

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
        this.router.navigate(['/'])

      },
      error: err => {
        this.isValid=false
        this.errorMessage = err.error.error;
        
      }
    });
  }
}
