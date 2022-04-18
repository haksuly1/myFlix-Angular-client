/**
 * The DirectorViewComponent is used to render information about the directors.
 * @module DirectorViewComponent
 */

import { Component, OnInit, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
// You'll use this import to close the dialog on success
import { MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-director-view',
  templateUrl: './director-view.component.html',
  styleUrls: ['./director-view.component.scss'],
})
/**
 *
 * @param data
 */
export class DirectorViewComponent implements OnInit {
  constructor(
    public fetchApiData: FetchApiDataService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      name: string;
      bio: string;
      birthdate: Date;
    }
  ) { }

  ngOnInit(): void { }
}