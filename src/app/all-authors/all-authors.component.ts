import { Component } from '@angular/core';
import { AuthorsRequestsService } from '../services/authors-requests.service';
import { Author } from '../interfaces/author';
import { MatPaginatorModule } from '@angular/material/paginator'
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-all-authors',
  standalone: true,
  imports: [ MatPaginatorModule, RouterLink ],
  templateUrl: './all-authors.component.html',
  styleUrl: './all-authors.component.css'
})
export class AllAuthorsComponent {
  authors !: Array<Author>;
  currentPage = 1;
  limit = 4;
  totalItems = 0;


  constructor(private authorsRequests: AuthorsRequestsService, private router: Router){}
  ngOnInit(){
    this.getAuthors();
  }
  onPageChange(page: number) {
    this.currentPage = page;
    this.getAuthors();
    console.log(this.currentPage)
  }
getAuthors(){
  this.authorsRequests.getAllAuthors(this.currentPage, this.limit).subscribe(
    (res) =>{ 
    this.authors = res.data.authors
    this.totalItems = res.data.total
  }
  );
}

sendAuthor(id : any){
  this.router.navigate([`/user/authors/${id}`]);
}
}
