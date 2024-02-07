import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { City } from '../../../Models/city';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-get-all-cities',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './get-all-cities.component.html',
  styleUrl: './get-all-cities.component.css'
})
export class GetAllCitiesComponent {
  cities: City[] = [];
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };
  constructor(private http: HttpClient, private router: Router) {
    this.getAllCities();
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
  delete(id: any) {
    console.log(id);
    this.http
      .delete('http://localhost:5084/api/City/DeleteCity/' + id,this.httpOptions)
      .subscribe((response) => {
        console.log(response);
      });
    this.getAllCities(); 
    location.reload(); 
  }
  getId(id: any) {
    this.router.navigateByUrl('admindashboard/search/:mid' + id);
  }

}
