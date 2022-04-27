/** 
 * The UserFavouritesComponent is used to display the movies saved to a user's FavouriteMovies list. 
 * The cards display the title, director and an image of the movie and contain buttons that can be opened 
 * to display dialogs with further information about the director or genre, or a synopsis. Movies can 
 * be added to or removed from favourites by clicking on a heart icon contained in the top right corner 
 * of each card. The heart colour toggles accordingly to reflect the movie's status.
 * 
 * @module UserFavouritesComponent
 */

import { Component, OnInit } from '@angular/core';
// Used to access the getUserProfile, getAllMovies, and deleteFavouriteMovie functions created on the service
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { SynopsisViewComponent } from '../synopsis-view/synopsis-view.component';
//import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-user-favourites',
  templateUrl: './user-favourites.component.html',
  styleUrls: ['./user-favourites.component.scss']
})
export class UserFavouritesComponent implements OnInit {
  user: any = {};
  genres: any[] = [];
  favouriteMovies: any[] = [];

  constructor(
    public dialog: MatDialog,
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
  ) { }

  /**
   * Calls the getFavouriteMovies and getUserProfile methods as soon as the component loads.
   */
  ngOnInit(): void {
    this.getUserProfile();
    this.getGenres();
    this.getFavouriteMovies();
  }

  /**
   * Function to get user details by making an API call
   * @function getUserProfile
   * @return an object with the user data in json format
   */

  getUserProfile(): void {
    const UserID = localStorage.getItem('UserID');
    if (UserID) {
      this.fetchApiData.getUserProfile().subscribe((res: any) => {
        this.user = res;
        console.log(this.user);
        return this.user;
      });
    }
  }

  /**
   * Function to get a list of all movies from the API, then filter this list to get movies with MovieID that 
   * matches the MovieIDs in user.FavouriteMovies
   * @function getFavouriteMovies
   * @returns an updated favouriteMovies array
   */
  getFavouriteMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.favouriteMovies = res.filter((movie: any) => {
        return this.user.FavouriteMovies.includes(movie._id)
      });
      console.log(this.favouriteMovies);
      return this.favouriteMovies;
    })
  }

  /**
   * Function to remove a certain movie object from the user's FavouriteMovies list using an Api call.
   * A popup will appear stating that the movie was removed from the user's favourites. Page gets reloaded to update the UI.
   * @function deleteFavouriteMovies
   * @param MovieID the id of the movie chosen by the user
   * @param title the title of the movie chosen by the user
   * @returns the function getFavouriteMovies() 
   */
  removeFavouriteMovie(MovieID: string, title: string): void {
    this.fetchApiData.deleteFavouriteMovie(MovieID).subscribe((resp: any) => {
      console.log(resp);
      this.snackBar.open(
        `${title} has been removed from your favourites!`,
        'OK',
        {
          duration: 3000,
        }
      );
      window.location.reload();
      this.ngOnInit();
    });
    return this.getFavouriteMovies();
  }

  /**
   * Open a dialog to display the director component, passing it the data it needs to display inside the data object.
   * @param name name of the director of the selected movie.
   * @param bio bio of the director.
   * @param birthdate birthdate of the director.
   */
  openDirector(name: string, bio: string, birthdate: Date): void {
    this.dialog.open(DirectorViewComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birthdate: birthdate,
      },
      width: '500px',
      backdropClass: 'backdropBackground'
    });
  }

  /**
   * Opens a dialog to display the synopsis component, passing it the data it needs to display inside the data object.
   * @function openSynopsis
   * @param title title of the selected movie.
   * @param imagePath image path of the selected movie.
   * @param description description of the selected movie.
   */
  openSynopsis(title: string, imagePath: any, description: string): void {
    this.dialog.open(SynopsisViewComponent, {
      data: {
        Title: title,
        ImagePath: imagePath,
        Description: description,
      },
      width: '500px',
      backdropClass: 'backdropBackground'
    });
  }

  /**
   * Invokes the getGenres method on the fetchApiData service and populates the movies array with the response. 
   * @function getGenres
   * @returns an array with all genre objects in json format
   */
  getGenres(): void {
    this.fetchApiData.getGenre().subscribe((resp: any) => {
      this.genres = resp;
      console.log(this.genres);
      return this.genres;
    });
  }

  /**
   * Function to search through genres array and find a match to the MovieID.
   * Opens a dialog to display the genre component, passing it the data it needs to display inside the data object.
   * @function openGenre
   * @param id id of the selected movie
   */
  openGenre(id: string): void {
    let name;
    let description;
    console.log(id);

    for (let i = 0; i < this.genres.length; i++) {
      console.log(this.genres[i]._id)
      if (this.genres[i]._id == id) {
        name = this.genres[i].Name;
        description = this.genres[i].Description;
        break;
      }
    }
    this.dialog.open(GenreViewComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '500px',
      backdropClass: 'backdropBackground'
    });
  }


}