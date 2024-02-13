import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../../../Models/user';
import { HttpHeaders } from '@angular/common/http';
import * as emailjs from 'emailjs-com';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule,FormsModule,HttpClientModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  user: User=new User();
  email: string = '';
  password: string = '';
  name:string='';
  mobile:string='';
  role:string='';
  errMsg: string = '';
  httpResponse: any;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }),
  };
  constructor(private http: HttpClient, private router: Router) {
  }
 
  addUser() {
    let adduser = { Name:this.name,Email: this.email,Mobile:this.mobile, Password: this.password,Role:this.role };
    const randomUserID = Math.floor(Math.random() * 100) + 1;
    this.user.userID = randomUserID.toString();
    
    this.http
      .post('http://localhost:5084/api/User/Register', this.user, this.httpOptions)
      .subscribe(
        (response) => {
          console.log(response);
          this.errMsg = 'Registration successful!';
          //this.router.navigateByUrl('login');
         // this.sendEmail();
        },
        (error) => {
          console.error(error);
          this.errMsg = 'Failed to register user.';
        }
      );
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.addUser();
      this.sendEmail();
    } else {
      this.errMsg = 'Please fill in all required fields correctly.';
    }
  }

  onReset(form: NgForm) {
    form.resetForm();
    this.user = new User();
    this.errMsg = '';
  }
  
  goToLogin(): void {
    this.router.navigateByUrl('login');
  }
  sendEmail() {
    const templateParams = {
      to_name: this.user.name,
      from_name: 'Book My Show',
      to_mail: this.user.email
    };
     emailjs.init("9gx3sBuN-983mV0Ns");
     emailjs.send('service_hrpkyli', 'template_v43n5jt', templateParams)
    .then((response) => {
      console.log('Email sent successfully:', response);
    }, (error) => {
      console.error('Error sending email:', error);
    });
  }


}
