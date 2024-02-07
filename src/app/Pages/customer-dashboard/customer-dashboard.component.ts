import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink,RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [CommonModule,RouterOutlet,RouterLink],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.css'
})
export class CustomerDashboardComponent {
  constructor(private router: Router) {}
  logout(): void {
    localStorage.clear(); 
    this.router.navigateByUrl('login'); 
  }

}
