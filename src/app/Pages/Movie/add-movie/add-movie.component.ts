import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Movie } from '../../../Models/movie';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { UploadImgComponent } from '../../upload-img/upload-img.component';

@Component({
  selector: 'app-add-movie',
  standalone: true,
  imports: [CommonModule,HttpClientModule,FormsModule,UploadImgComponent],
  templateUrl: './add-movie.component.html',
  styleUrl: './add-movie.component.css'
})
export class AddMovieComponent {
  movie: Movie;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };
  constructor(private http: HttpClient, private router: Router) {
    this.movie = new Movie();
  }
  addMovie() {
    this.movie.imageUrl = localStorage.getItem('imageUrl');
    this.http
      .post('http://localhost:5084/api/Movie/AddMovie', this.movie,
      this.httpOptions
      )
      .subscribe((response) => {
        console.log(response);
      });
    this.router.navigateByUrl('admindashboard/getallmovies').then(()=>{
      window.location.reload();
    }); 
  }
  goToImageUrl(): void {
    this.router.navigateByUrl('uploadimg'); 
  }


}
