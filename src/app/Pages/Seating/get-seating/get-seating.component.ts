import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Seating } from '../../../Models/seating';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-get-seating',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './get-seating.component.html',
  styleUrl: './get-seating.component.css'
})
export class GetSeatingComponent implements OnInit {
  selectedSeats: Set<string> = new Set();
  seatingList: Seating[] = [];
  showID: number | null = null;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };

  constructor(private http: HttpClient) { }
  

  ngOnInit(): void {
    // Retrieve show ID from local storage
    const showIDFromStorage = localStorage.getItem('showID');
    if (showIDFromStorage) {
      this.showID = +showIDFromStorage; // Convert string to number
      this.getSeatingByShowID(this.showID);
    }
  }

  getSeatingByShowID(showID: number): void {
    this.http.get<Seating[]>(`http://localhost:5084/api/Seating/GetSeatingByShowID/${showID}`,this.httpOptions)
      .subscribe(data => {
        this.seatingList = data;
      });
    }
    generateNumberArray(n: number): number[] {
      return Array.from({ length: n }, (_, i) => i + 1);
    } 
    toggleSeat(number: number, row: string): void {
      const seatKey = `${row}${number}`;
      if (this.selectedSeats.has(seatKey)) {
        this.selectedSeats.delete(seatKey);
      } else {
        this.selectedSeats.add(seatKey);
      }
    }
  
    // Method to check if a seat is selected
    isSeatSelected(row: string, number: number): boolean {
      return this.selectedSeats.has(`${row}${number}`);
    } 
    
  }