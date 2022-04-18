/**
 * The UserProfileComponent is used to view the user profile.
 * @module ProfileViewComponent
 */

import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { MovieDescriptionComponent } from '../movie-description/movie-description.component';
import { UserEditComponent } from '../user-edit/user-edit.component';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss'],
})
export class ProfileViewComponent implements OnInit {
  user: any = {};
  Username = localStorage.getItem('user');
  favMovies: any[] = [];

  constructor(
    public dialog: MatDialog,
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getUserProfile();
    this.getFavoriteMovies();
  }

  /**
   * call API endpoint to get user info
   * @function getUserProfile
   * @param Username
   * @return users data in json format
   */

  getUserProfile(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.fetchApiData.getUserProfile(user).subscribe((res: any) => {
        this.user = res;
        console.log(this.user);
        return this.user;
      });
    }
  }

  /**
   * get users FavoriteMovies from the users data
   */
  getFavoriteMovies(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.fetchApiData.getUserProfile(user).subscribe((res: any) => {
        this.favMovies = res.FavoriteMovies;
        console.log(this.favMovies);
        return this.favMovies;
      });
    }
  }

  /**
   * use API end-point to remove user favorite
   * @function deleteFavoriteMovies
   * @param Id {string}
   * @returns updated users data in json format
   */
  removeFavoriteMovies(movieID: string, title: string): void {
    this.fetchApiData.deleteFavoriteMovies(movieID).subscribe((resp: any) => {
      console.log(resp);
      this.snackBar.open(
        `${title} has been removed from your favorites!`,
        'OK',
        {
          duration: 2000,
        }
      );
      this.ngOnInit();
    });
  }

  /**
   * call API endpoint to remove the current user
   * @function deleteUserProfile
   * @param Username {any}
   * @return that the account has been removed
   */
  deleteUser(): void {
    this.fetchApiData.deleteUserProfile().subscribe(() => {
      this.snackBar.open(`${this.Username} has been removed!`, 'OK', {
        duration: 4000,
      });
      localStorage.clear();
    });
    this.router.navigate(['welcome']);
  }

  /**
   * open a dialog to edit the profile of the user
   * @module EditProfileFormComponent
   */
  openEditUserDialog(): void {
    this.dialog.open(UserEditComponent, {
      width: '280px',
    });
  }

  /**
   *open a dialog to display the GenreViewComponent
   * @param name {string}
   * @param description {string}
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      data: { name: name, description: description },
      width: '300px',
    });
  }

  /**
   * open a dialog to display the DirectorViewComponent
   * @param name {string}
   * @param bio {string}
   * @param birthdate {string}
   */

  openDirectorDialog(name: string, bio: string, birthdate: string): void {
    this.dialog.open(DirectorViewComponent, {
      data: { name: name, bio: bio, birth: birthdate },
      width: '300px',
    });
  }

  /**
   * open a dialog to display the MovieDescriptionComponent
   * @param title {string}
   * @param description {string}
   */
  openMovieDescDialog(title: string, description: string): void {
    this.dialog.open(MovieDescriptionComponent, {
      data: { title: title, description: description },
      width: '300px',
    });
  }
}