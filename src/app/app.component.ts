import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StorageServiceService } from './services/storage-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { jwtDecode } from "jwt-decode";
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MEAN-Frontend';


}
