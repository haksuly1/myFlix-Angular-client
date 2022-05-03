/** 
 * The UserLoginFormComponent is used to render a mat dialog containing a form where the
 * user can submit their credentials to log in to myFlix.
 * @module UserLoginFormComponent
 */

import { Component, OnInit, Input } from '@angular/core';
// Used to navigate the user to the movies route on a successful login
import { Router } from '@angular/router';
// Used to access the loginUser function created on this service
import { FetchApiDataService } from '../fetch-api-data.service';
// Material Imports
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  /** 
   * userCredentials values are populated by form inputs in the user-login-form template that are bound 
   * using the ngModel directive.
   */
  @Input() userData = {
    Username: '',
    Password: ''
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

  ngOnInit(): void {
  }

  /**
   * function responsible for sending form inputs to backend
   * @function userLogin
   * @return user data in JSON format
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((response) => {
      console.log(response);
      // Logic for a successful user login
      //localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('user', response.user.Username);
      localStorage.setItem('token', response.token);
      //localStorage.setItem('UserID', response.user.Username);
      console.log(response.user);
      this.dialogRef.close(); // This will close the modal on success!
      this.snackBar.open('User login successful!', 'OK', {
        duration: 5000
      });
      this.router.navigate(['movies']);
    }, (response) => {
      console.log(response);
      this.snackBar.open("Login unsuccessful. Please check your username and password", 'OK', {
        duration: 2000
      });
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}