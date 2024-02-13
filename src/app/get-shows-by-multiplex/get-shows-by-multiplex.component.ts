import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Show } from '../Models/show';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Multiplex } from '../Models/multiplex';
import { City } from '../Models/city';
import { Booking } from '../Models/booking';
import { Movie } from '../Models/movie';

@Component({
  selector: 'app-get-shows-by-multiplex',
  standalone: true,
  imports: [CommonModule,HttpClientModule,FormsModule],
  templateUrl: './get-shows-by-multiplex.component.html',
  styleUrl: './get-shows-by-multiplex.component.css'
})
export class GetShowsByMultiplexComponent {
  shows: any[] = []; 
  cities:City[]=[];
 bookings:any[]=[];
  movies:Movie[]=[];
  mulID: number=0;
  showID: number | null = null; 
  cityID:number=0;
 show:Show;
  amount:number=100;
  booking:Booking[]=[];
  multiplexes:Multiplex[]=[];
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
    this.getAllCities();
    this.getAllMultiplexes();
    this.getMultiplexByCityID();
    this.getMovieByMultiplexID();
    this.show= new Show();
   
  
    
  
    
  
  }
  getAllMultiplexes() {
    this.http
      .get<Multiplex[]>('http://localhost:5084/api/Multiplex/GetAllMultiplexes',
      this.httpOptions
      )
      .subscribe((response) => {
        this.multiplexes = response;
        console.log(this.multiplexes);
      });
  }
  getAllCities() {
    this.http
      .get<City[]>('http://localhost:5084/api/City/GetAllCities',
      this.httpOptions
      )
      .subscribe((response) => {
        this.cities = response;
        console.log(this.cities);
      });
  }
 getMultiplexByCityID() {
    const url = `http://localhost:5084/api/Multiplex/GetMultiplexByCityID/${this.cityID}`;
    this.http.get<Multiplex[]>(url, this.httpOptions).subscribe(
      (response) => {
        if (response && response.length > 0) {
          this.multiplexes = response;
          console.log(this.multiplexes);
        } else {
          console.log(`No multiplexes found for city ID: ${this.cityID}`);
          this.multiplexes = [];
        }
      },
      (error) => {
        console.error('Error fetching multiplexes:', error);
      }
    );
  }
  getMovieByMultiplexID() {
    const url = `http://localhost:5084/api/Movie/GetMoviesByMulID/${this.mulID}`;
    this.http.get<Movie[]>(url, this.httpOptions).subscribe(
      (response) => {
        if (response && response.length > 0) {
          this.movies = response;
          console.log(this.movies);
        } else {
          console.log(`No movies found for Multilex ID: ${this.mulID}`);
          this.multiplexes = [];
        }
      },
      (error) => {
        console.error('Error fetching Movies:', error);
      }
    );
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
    this.getAllMultiplexes(); 
    location.reload(); 
  }
  getId(id: any) {
     this.router.navigateByUrl('customerdashboard/multiplexbyid/' + id);
   }
  getSeatingByShowID(showId:any) : void{
    localStorage.setItem("showID",showId);
  
      this.router.navigateByUrl('customerdashboard/getseating'); 
  
    }
// getShowByMovieID(movieId:any) : void{
//       localStorage.setItem("movieID",movieId);
    
//         this.router.navigateByUrl('customerdashboard/getshow'); 
    
//       }
  
}
