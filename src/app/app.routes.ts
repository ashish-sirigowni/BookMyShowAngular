import { Routes } from '@angular/router';
import { AddCityComponent } from './Pages/City/add-city/add-city.component';
import { GetSeatingComponent } from './Pages/Seating/get-seating/get-seating.component';
import { GetAllCitiesComponent } from './Pages/City/get-all-cities/get-all-cities.component';
import { GetAllMultiplexesComponent } from './Pages/Multiplex/get-all-multiplexes/get-all-multiplexes.component';
import { GetShowsByMultiplexComponent } from './get-shows-by-multiplex/get-shows-by-multiplex.component';
import { LoginComponent } from './Pages/login/login.component';
import { CustomerDashboardComponent } from './Pages/customer-dashboard/customer-dashboard.component';

export const routes: Routes = [
    {path:'addcity',component:AddCityComponent},
    {path:'getseating',component:GetSeatingComponent},
    {path:'getallcities',component:GetAllCitiesComponent},
    {path:'getallmultiplexes',component:GetAllMultiplexesComponent},
    {path:'customerdashboard',
component:CustomerDashboardComponent,
children:[
    {path:'getallcities',component:GetAllCitiesComponent},
    {path:'getallmultiplexes',component:GetAllMultiplexesComponent},
    {path:'getshowsbymultiplex',component:GetShowsByMultiplexComponent},
    {path:'getseating',component:GetSeatingComponent}
    // {path:'login',component:LoginComponent},
    // {path:'getallbookings',component:GetAllBookingsComponent},
    // {path:'addbooking',component:AddBookingComponent},
    // {path:'getshowbymovieid',component:GetShowByMovieIdComponent},
    // {path:'addbooking',component:AddBookingComponent},
    // {path:'adduser',component:AddUserComponent},
],
},
{path:'',component:LoginComponent}
];
