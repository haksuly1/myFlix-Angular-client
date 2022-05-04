// src/app/user-registration-form/user-registration-form.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {
  /**
   * input values stored in userData
   */

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
    ) { }

  ngOnInit(): void {
  }

  /**
   * function for sending the form inputs to the backend
   * @function userRegistration
   * @param userData {object}
   * @return new user data in JSON format
   */

  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
      let userCredentials = (({ Username, Password }) => ({ Username, Password }))(this.userData);
      this.fetchApiData.userLogin(userCredentials).subscribe((response) => { 
        //logic for a successful register user request
        console.log(response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('UserID', response.user._id);
        localStorage.setItem('user', JSON.stringify(response.user));
        /**
          * close Dialog on button press 
          */
        this.dialogRef.close();
        this.router.navigate(['movies']); //Routes user to "/movies"
      }, (response) => {
        this.snackBar.open(response, 'OK', {
          duration: 2000
        });
      });
    }, (response) => {
      console.log(response);
      this.snackBar.open("Sorry we couldn't register you. Please try a different username", 'OK', {
        duration: 2000
      });
    });
  }
}


