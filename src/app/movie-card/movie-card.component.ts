/** 
 * The MovieCardComponent is used to display the data retrieved from the movies collection of the
 * myFlix database. The data is looped through using the ngFor directive and each movie is rendered as
 * a mat card in the template. The cards display the title, director and an image of the movie and contain
 * buttons that can be opened to display dialogs with further information about the director or genre, 
 * or a synopsis. Movies can be added to or removed from favourites by clicking on a heart icon contained
 * in the top right corner of each card. The heart colour toggles accordingly to reflect the movie's status.
 * 
 * @module MovieCardComponent
 */

import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { SynopsisViewComponent } from '../synopsis-view/synopsis-view.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  user: any = {};
  username: any = localStorage.getItem('user');
  movies: any[] = [];
  genres: any[] = [];
  FavMovie: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  /**
   * Function to get movies, genres and favouriteMovies when component is initialized.
   */
  ngOnInit(): void {
    this.getMovies();
    this.showFavMovie();

  }

  /**
   * Invokes the getAllMovies method on the fetchApiData service and populates the movies array with the response. 
   * @function getAllMovies
   * @return an array with all movie objects in json format
   */

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  getCurrentUser(): void {
    const username = localStorage.getItem('user');
    this.fetchApiData.getUser(username).subscribe((resp: any) => {

      console.log(resp)
      const currentUser = resp.username
      console.log(currentUser)
      const currentFavs = resp.FavoriteMovies
      console.log(currentFavs)

    });
  }

  /**
   * Invokes the getGenres method on the fetchApiData service and populates the movies array with the response. 
   * @function getGenres
   * @returns an array with all genre objects in json format
   */
  getGenres(): void {
    this.fetchApiData.getGenres().subscribe((resp: any) => {
      this.genres = resp;
      console.log(this.genres);
      return this.genres;
    });
  }

  /**
     * Invokes the getUserProfile method on the fetchApiData service and populates the favouriteMovies array with
     * the FavouriteMovies property on the response, which is an array of the user's favourite movies.
     * @function getFavouriteMovies
     * @returns an array with movie objects from user's FavouriteMovies list 
     */
  showFavMovie(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.FavMovie = resp.FavoriteMovies;
      return this.FavMovie;
    });
  }

  /**
   * Invokes the addFavouriteMovie method on the fetchApiData service, to add the movie to the user's
   * FavouriteMovies. If successful, a popup is displayed confirming that the movie has been added. 
   * @function addFavouriteMovie
   * @param MovieID _id of the selected movie.
   * @param title Title of the selected movie.
   * @returns an updated array of movie objects in a user's FavouriteMovies list
   */
  addFavouriteMovie(movieId: string, Title: string): void {
    this.fetchApiData.addFavouriteMovie(movieId).subscribe((resp: any) => {
      console.log(resp);
      this.snackBar.open(`${Title} has been added to your favourites!`, 'OK', {
        duration: 3000,
      });
      this.showFavMovie();
    });
  }

  setAsFavourite(movie: any): void {
    this.isFavourite(movie._id)
      ? this.deleteFavouriteMovie(movie._id, movie.Title)
      : this.addFavouriteMovie(movie._id, movie.Title);
  }

  /**
   * Function that checks if the user's FavouriteMovies list includes the selected movie's _id
   * @param MovieID _id of the selected movie.
   * @returns true or false
   */
  isFavourite(movieId: string): boolean {
    console.log(movieId);
    console.log('FavouriteMovie list', this.FavMovie);
    return this.FavMovie.some((id) => id === movieId);
  }

  /**
     * Invokes the deleteFavouriteMovie method on the fetchApiData service, to remove the movie from the user's
     * FavouriteMovies. If successful, a popup is displayed confirming that the movie has been removed. 
     * @function deleteFavoriteMovies
     * @param MovieID _id of the selected movie.
     * @param title Title of the selected movie.
     * @returns an updated array of movie objects in a user's FavouriteMovies list
     */
  deleteFavouriteMovie(movieId: string, Title: string): void {
    this.fetchApiData.deleteFavouriteMovie(movieId).subscribe((resp: any) => {
      console.log(resp);
      this.snackBar.open(`${Title} is no longer a favourite of yours!`, 'OK', {
        duration: 3000,
      });
      this.showFavMovie();
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
      width: '500px'
    });

  }

  /**
     * Function to search through genres array and find a match to the MovieID.
     * Opens a dialog to display the genre component, passing it the data it needs to display inside the data object.
     * @function openGenre
     * @param id id of the selected movie
     */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      panelClass: 'custom-dialog-container',
      data: {
        Name: name,
        Description: description,
      },
      width: '500px'
    });
  }

  /**
   * Open a dialog to display the director component, passing it the data it needs to display inside the data object.
   * @param name name of the director of the selected movie.
   * @param bio bio of the director.
   * @param birthdate birthdate of the director.
   */

  openDirectorDialog(name: string, bio: string): void {
    this.dialog.open(DirectorViewComponent, {
      panelClass: 'custom-dialog-container',
      data: { Name: name, Bio: bio },
      width: '500px',
    });
  }
}

  
  

  
  

  

  
  
  
  