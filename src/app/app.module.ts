/**
 * The AppModule class is used to import then declare all of the components that will be used in the app, 
 * as well as to import all of the modules that will be used. The AppComponent is bootstrapped when the
 * module is bootstrapped, and thereby gets access to the module contents. By virtue of being children of
 * the AppComponent (which is the root component), all the other components get access to exported 
 * declarables of the imported modules in the AppModule too, as well as to the other child components.
 * @module AppModule
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


//Material imports
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

//Components imports
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { GenreViewComponent } from './genre-view/genre-view.component';
import { DirectorViewComponent } from './director-view/director-view.component';
import { SynopsisViewComponent } from './synopsis-view/synopsis-view.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { UserFavouritesComponent } from './user-favourites/user-favourites.component';

const appRoutes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'movies', component: MovieCardComponent },
  { path: 'profile', component: ProfileViewComponent },
  { path: 'my-list', component: UserFavouritesComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
];

@NgModule({
  declarations: [
    AppComponent,
    UserRegistrationFormComponent,
    UserLoginFormComponent,
    MovieCardComponent,
    WelcomePageComponent,
    GenreViewComponent,
    DirectorViewComponent,
    SynopsisViewComponent,
    NavbarComponent,
    ProfileViewComponent,
    UserFavouritesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule,
    FormsModule,
    MatMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }