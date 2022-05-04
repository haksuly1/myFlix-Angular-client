import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-synopsis-view',
  templateUrl: './synopsis-view.component.html',
  styleUrls: ['./synopsis-view.component.scss']
})
export class SynopsisViewComponent implements OnInit {
  
  /**
     * 
     * @param data 
     */

  constructor(
    
    /**
     * Uses Inject to get the movie details from the movie object
     */
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Title: string,
      ImagePath: any,
      Description: string,
      Genre: string
    }
  ) { }


  ngOnInit(): void {
  }


}