import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Seating } from '../../../Models/seating';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



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
  rows: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'Z'];
  seatNumbers: number[] = Array.from({ length: 10 }, (_, i) => i + 1);
  ticketPrice: number = 200; // Initial ticket price

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
    this.http.get<Seating[]>(`http://localhost:5084/api/Seating/GetSeatingByShowID/${showID}`, this.httpOptions)
      .subscribe(data => {
        this.seatingList = data;
      });
  }

  toggleSeat(number: number, row: string): void {
    const seatKey = `${row}${number}`;
    if (this.selectedSeats.has(seatKey)) {
      this.selectedSeats.delete(seatKey);
    } else {
      this.selectedSeats.add(seatKey);
    }
  }
  
  isSeatSelected(row: string, number: number): boolean {
    return this.selectedSeats.has(`${row}${number}`);
  }

  saveSelectedSeating(): void {
    const selectedSeating: Seating[] = [];
    this.selectedSeats.forEach(seatKey => {
      const row = seatKey.substring(0, 1);
      const number = +seatKey.substring(1); // Change seatNumber to number
      const selectedSeat: Seating = {
        row: row,
        number: number,
        // Add other properties as needed
      };
      selectedSeating.push(selectedSeat);
    });

    // Send HTTP POST request to save selected seating
    this.http.post<any>('http://localhost:5084/api/Seating/AddSelectedSeating/' + this.showID, selectedSeating, this.httpOptions)
      .subscribe(response => {
        console.log('Selected seating saved:', response);
        // Optionally, you can clear selectedSeats set after successful saving
        this.selectedSeats.clear();
      }, error => {
        console.error('Error saving selected seating:', error);
      });
  }
  isSeatBooked(row: string, number: number): Observable<boolean> {
    return this.http.get<boolean>(`http://localhost:5084/api/Seating/IsSeatBooked/${this.showID}/${row}/${number}`, this.httpOptions);
  }

  }