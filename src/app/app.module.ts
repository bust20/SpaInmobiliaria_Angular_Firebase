import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

//Imports Firebase
import { environment } from 'src/environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

//Gestion Users
import { getAuth, provideAuth } from '@angular/fire/auth';

import { AppComponent } from './app.component';

//Imports "Layouts"
import { HeaderComponent } from './components/layouts/header/header.component';
import { FooterComponent } from './components/layouts/footer/footer.component';

//Views Publicas
import { HomeComponent } from './components/views-publicas/home/home.component';
import { CatalogComponent } from './components/views-publicas/catalog/catalog.component';
import { DetailsComponent } from './components/views-publicas/details/details.component';
import { AboutComponent } from './components/views-publicas/about/about.component';
import { ContactComponent } from './components/views-publicas/contact/contact.component';

//Views Privadas
import { AddPropertyComponent } from './components/views-privadas/add-property/add-property.component';
import { UpdatePropertyComponent } from './components/views-privadas/update-property/update-property.component';
import { CalendarComponent } from './components/views-privadas/calendar/calendar.component';

//Rutas 
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/Login-Register/register/register.component';
import { LoginComponent } from './components/Login-Register/login/login.component';
import { LogoutComponent } from './components/Login-Register/logout/logout.component';
import { LoginGoogleComponent } from './components/Login-Register/login-google/login-google.component';

import { sessionGuard } from './guard/session.guard';
import { registerGuard } from './guard/register.guard';
import { rolesGuard } from './guard/roles.guard';

const routes: Routes = [
  //Views publicas
  { path: 'home', component: HomeComponent },
  { path: 'details/:element', component: DetailsComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },

  //Views privadas
  { path: 'addProperty', component: AddPropertyComponent, canActivate: [sessionGuard, rolesGuard] },
  { path: 'updateProperty/:element', component: UpdatePropertyComponent, canActivate: [sessionGuard, rolesGuard] },
  { path: 'calendar/:element', component: CalendarComponent, canActivate: [sessionGuard] },

  //Views login register
  { path: 'register', component: RegisterComponent, canActivate: [registerGuard] },
  { path: 'login', component: LoginComponent, canActivate: [sessionGuard] },

  //Redirect
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'updateProperty', redirectTo: 'home', pathMatch: 'full' },
  { path: 'calendar', redirectTo: 'home', pathMatch: 'full' }

];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    AboutComponent,
    CatalogComponent,
    DetailsComponent,
    ContactComponent,
    AddPropertyComponent,
    UpdatePropertyComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    LoginGoogleComponent,
    CalendarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
