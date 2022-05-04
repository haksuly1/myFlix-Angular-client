import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { FetchApiDataService } from '../fetch-api-data.service';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { SynopsisViewComponent } from '../synopsis-view/synopsis-view.component';


@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {
  user: any = {};
  movies: any[] = [];
  userName: any = localStorage.getItem('user');
  favourites: any = null;
  FavMovie: any = [];
  displayElement: boolean = false

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router
  ) { }

  ngOnInit(): void {


    // this.getFavoriteMovies()
    this.getUser();
    this.getFavMovie()
  }
  
  /**
   * calls API endpoint to get user info
   * @function getUser
   * @return user data in JSON format
   */
  getUser(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.fetchApiData.getUser(user).subscribe((resp: any) => {
        this.user = resp;
        console.log(this.user);
      });
    }
  }

  /**
   * open Synopsis dialog
   * @param title 
   * @param description 
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
   * open Director dialog 
   */

  openEditUserProfile(): void {
    this.dialog.open(UserEditComponent, {
      width: '500px'
    });
  }

  openDirectorDialog(name: string, bio: string, birth: string): void {
    this.dialog.open(DirectorViewComponent, {
      data: { Name: name, Bio: bio, Birth: birth },
      width: '500px',
    });
  }
 
  /**
     * open Genre dialog
     * @param name 
     * @param description 
     */

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '500px'
    });
  }

  /**
   * function to let the user display their favorited movies 
   * @function getAllMovies
   */

  getFavMovie(): void {
    this.fetchApiData.getMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.movies.forEach((movie: any) => {
        if (this.user.FavoriteMovies.includes(movie._id)) {
          this.FavMovie.push(movie);
        }
      });
    });
    console.log(this.FavMovie);
  }


  /**
   * function to let the user remove a movie from their favorited movies
   * @function deleteFavMovie
   * @param movieId
   * @param Title
   * @returns updated user data in JSON format
   */
  removeFavMovie(movieId: string, Title: string): void {
    this.fetchApiData.deleteFavouriteMovie(movieId).subscribe((resp) => {
      console.log(resp);
      this.snackBar.open(
        `${Title} is no longer favorited`,
        'OK',
        {
          duration: 1000,
        }
      );
      setTimeout(function () {
        window.location.reload();
      }, 1000);
    });
  }

  /**
   * dialog to delete user profile information
   */

  deleteUserProfile(): void {
    if (confirm('Are you sure? This cannot be undone.')) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('Your account was deleted', 'OK', { duration: 6000 });
      });
      this.router.navigate(['welcome'])
      this.fetchApiData.deleteUserProfile().subscribe(() => {
        localStorage.clear();
      });
    }

  }

}