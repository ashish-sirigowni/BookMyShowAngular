import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Show } from '../../Models/show';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-getshow',
  standalone: true,
  imports: [CommonModule,HttpClientModule,FormsModule],
  templateUrl: './getshow.component.html',
  styleUrl: './getshow.component.css'
})
export class GetshowComponent {
  shows: any[] = []; 
 bookings:any[]=[];
  mulID: number=0;
  showID: number | null = null; 
  cityID:number=0;
 show:Show;
  amount:number=100;
  movieID: number | null = null;
  showTimings: string[] = ['Morning Show', 'Afternoon Show', 'First Show', 'Second Show']; 
  selectedShowTiming: string = '';



  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };
  constructor(private http: HttpClient, private router: Router) {
    
    this.show= new Show();
   
  
    
  
    
  
  }
  getShowByMovieID(movieID:any) {
    if (movieID) {
      const url = `http://localhost:5084/api/Show/GetShowsByMovieID/${movieID}`;
  
      this.http.get<Show[]>(url, this.httpOptions).subscribe(
        (response) => {
          if (response && response.length > 0) {
            this.shows = response;
            console.log(this.shows);
          } else {
            console.log(`No Shows found for Movie ID: ${movieID}`);
            this.shows = [];
          }
        },
        (error) => {
          console.error('Error fetching Shows:', error);
        }
      );
    } else {
      console.log('Movie ID is not selected');
    }
  }
 delete(id: any) {
    console.log(id);
    this.http
      .delete('http://localhost:5084/api/Show/DeleteShow/' + id,
      this.httpOptions
      )
      .subscribe((response) => {
        console.log(response);
      });
   
  }
  getId(id: any) {
    this.router.navigateByUrl('customerdashboard/multiplexbyid/' + id);
  }
  getSeatingByShowID(showId:any) : void{
    localStorage.setItem("showID",showId);
  
      this.router.navigateByUrl('customerdashboard/getseating'); 
  
    }

}
