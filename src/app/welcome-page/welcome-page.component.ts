import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  constructor(public dialog: MatDialog) { }
  ngOnInit(): void {

    /**
       * function that will open dialog when signup button is clicked
       * @module UserRegistrationFormComponent
       */

  }
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      panelClass: 'custom-dialog-container',
      // assigning dialog a width
      width: '280px'
    });
  }

  /**
     * function that will open dialog when login button is clicked
     * @module UserLoginFormComponent
     */

  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      panelClass: 'custom-dialog-container',
      //assigning width to dialog
      width: '280px'
    });
  }
}