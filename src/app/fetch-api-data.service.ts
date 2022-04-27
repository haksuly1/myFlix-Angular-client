/**
 * The FetchApiDataService class is used to make Http requests to the myFlix Api to retrieve data on movies and
 * users that is used within the app, as well as to register and login users, update their details, and
 * to add or remove movies from their favourites. The class is marked with the Injectable decorator and
 * injected as a dependency to the root component, thereby making the service available to all the other
 * components.
 * @module FetchApiDataService
 */


// Used to provide the service as an injectable dependency to the root app
import { Injectable } from '@angular/core';
// Used to make Http requests to the Api
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// Requests return Observables (similar to Promises) 
import { Observable, throwError, catchError } from 'rxjs';
import { map } from 'rxjs/operators';


// The Url for the heroku hosted API to which the http requests are made
const apiUrl = 'https://haksuly1movieapp.herokuapp.com/';

// The service is provided to the root component and becomes available to all components
@Injectable({
  providedIn: 'root'
})


export class FetchApiDataService {
  getGenre: any;
  getUser: any;
  deleteFavMovie: any;
  /**
   * * Inject the HttpClient module to the constructor params.
   * This will provide HttpClient to the entire class, making it available via "this.http"
   * @param http
   */
  constructor(private http: HttpClient) { }


  /** 
   * Function to register users by making an API call to the users registration endpoint (POST /users).
   * @funtion userRegistration
   * @param userDetails an object with user details (FirstName, LastName, Username, Email, Password, Birthdate)
   * @returns an object with all user details in json format
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }


  /**
   * Function to login users by making an API call to the users login endpoint (POST /login).
   * @param userDetails (Username, Password)
   * @returns an object with all user details in json format
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }


  /**
   * Function to get a list of all movies by making an API call to the movies endpoint (GET /movies).
   * Call requires user authentication via a bearer token
   * @function getAllMovies
   * @return an array with all movies in json format
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Function to get a specific movie by title by making an API call to the movies/:Title endpoint (GET /movies/:Title).
   * Call requires user authentication via a bearer token
   * @function getSingleMovie
   * @returns an object with movie details in json format
   */

  getSingleMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/:Title', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Function to get details about a director by making an API call to the movies/director/:Name endpoint (GET /movies/director/:Name).
   * Call requires user authentication via a bearer token
   * @function getDirector
   * @returns an object with director details in json format
   */

  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/director/:Name', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Function to get a list of all genres by making an API call to the genres endpoint (GET /genres).
   * Call requires user authentication via a bearer token
   * @function getGenres
   * @returns an array with all genres in json format
   */
  getGenres(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'genres', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Function to get user details of a specific user by making an API call to the users/:UserID endpoint (GET /users/:UserID).
   * UserID is retrieved from localStorage. 
   * Call requires user authentication via a bearer token
   * @function getUserProfile
   * @returns an object with user information in json format
   */
  getUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const UserID = localStorage.getItem('UserID');
    return this.http
      .get(apiUrl + `users/${UserID}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }


  /**
   * Function to add a movie object to a specific user's FavouriteMovies by making an API call to the users/:UserID/movies/:MovieID endpoint (POST /users/:UserID/movies/:MovieID).
   * UserID is retrieved from localStorage. 
   * Call requires user authentication via a bearer token
   * @function addFavouriteMovies
   * @param MovieID the _id of a movie the user wishes to add to their favourites list
   * @returns an updated user object with the newly added movie object to FavouriteMovies
   */
  addFavouriteMovie(MovieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const UserID = localStorage.getItem('UserID');
    return this.http
      .post(apiUrl + `users/${UserID}/movies/${MovieID}`, null, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Function to remove a movie object from a specific user's FavouriteMovies by making an API call to the users/:UserID/movies/:MovieID endpoint (DELETE /users/:UserID/movies/:MovieID).
   * UserID is retrieved from localStorage. 
   * Call requires user authentication via a bearer token
   * @function deleteFavouriteMovie
   * @param MovieID the _id of a movie the user wishes to remove from their favourites list
   * @returns an updated user object with the newly removed movie object from FavouriteMovies
   */
  deleteFavouriteMovie(MovieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const UserID = localStorage.getItem('UserID');
    return this.http
      .delete(apiUrl + `users/${UserID}/movies/${MovieID}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Function to edit the user details for a specific user by making an API call to the users/:UserID endpoint (PUT /users/:UserID/movies/:MovieID).
   * UserID is retrieved from localStorage. 
   * Call requires user authentication via a bearer token
   * @function editUserProfile
   * @param userData an object with the newly edited user details (FirstName, LastName, Username, Email, Password, Birthdate)
   * @returns an object with the updated user data in json format
   */
  editUserProfile(userData: object): Observable<any> {
    const token = localStorage.getItem('token');
    const UserID = localStorage.getItem('UserID');
    return this.http
      .put(apiUrl + `users/${UserID}`, userData, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Function to delete a user by making an API call to the users/:UserID endpoint (DELETE /users/:UserID).
   * UserID is retrieved from localStorage. 
   * Call requires user authentication via a bearer token
   * @function deleteUserProfile
   * @returns delete user profile
   */
  public deleteUserProfile(): Observable<any> {
    const token = localStorage.getItem('token');
    const UserID = localStorage.getItem('UserID');
    return this.http
      .delete(apiUrl + `users/${UserID}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }


  /**
   * Takes a request response and returns either the response body or an empty object.
   * @param res The response to an Http request.
   * @returns Either the response or an empty object.
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  /**
   * Handles error responses to Http requests.
   * @param error The HttpErrorResponse returned on the Observable's response stream.
   * @returns An observable that errors with the specified message.
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return (
      'Something bad happened; please try again later.');
  }
}