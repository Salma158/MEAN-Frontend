import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { StorageServiceService } from '../../services/storage-service.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
  })
  export class HeaderComponent {
    loggedIn !: boolean;

    constructor(private storageService : StorageServiceService, private router : Router) {}
  
    ngOnInit(){
      if(localStorage.getItem('userToken')){
        this.loggedIn = true;
      } else{
        this.loggedIn = false;
      }
    }

    logOut(){
      this.storageService.clean()
      this.router.navigate([''])
    }


}
