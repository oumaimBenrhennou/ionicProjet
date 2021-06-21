import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';

let headers = new HttpHeaders();
headers = headers.set('Access-Control-Allow-Origin','*');
const httpOptions = {
  headers: headers
};


@Injectable({
  providedIn: 'root'
}) 
export class ApiService {

  constructor(private http: HttpClient,private toast: ToastController) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }



  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  httpClient(){
    return this.http;
  }
 
  adduser(params): Observable<any> {
    console.log(params)
    let api = 'https://khadijaexpress.herokuapp.com/addetudiant'
    var formData: any = new FormData();
    formData.append("username", params.username);
    formData.append("phone", params.phone);
    // httpOptions.params = params;
    console.log(httpOptions)
    return this.http.post(api, formData, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  login(params): Observable<any> {
    console.log(params)
    let api = 'https://khadijaexpress.herokuapp.com/login'
    var formData: any = new FormData();
    formData.append("phone", params.phone);
    // httpOptions.params = params;
    console.log(httpOptions)
    return this.http.post(api, formData, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }


  get_monuments(): Observable<any> {
    let api = 'https://khadijaexpress.herokuapp.com/getmonuments'
    var formData: any = new FormData();
    // httpOptions.params = params;
    console.log(httpOptions)
    return this.http.get(api, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  get_etudiants(): Observable<any> {
    let api = 'https://khadijaexpress.herokuapp.com/getetudiants'
    var formData: any = new FormData();
    // httpOptions.params = params;
    console.log(httpOptions)
    return this.http.get(api, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  get_visits(params): Observable<any> {
    let api = 'https://khadijaexpress.herokuapp.com/getvisits'
    var formData: any = new FormData();
    formData.append("id", params.id);
    // httpOptions.params = params;
    console.log(httpOptions)
    return this.http.post(api,formData, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  add_monument(params): Observable<any> {
    let api = 'https://khadijaexpress.herokuapp.com/addmonument'
    var formData: any = new FormData();
    formData.append("nom", params.nom);
    formData.append("latitude", params.latitude);
    formData.append("longitude", params.longitude);
    formData.append("ville", params.ville);
    formData.append("image", params.image);
    // httpOptions.params = params;
    console.log(httpOptions)
    return this.http.post(api,formData, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }

  add_visit(params): Observable<any> {
    let api = 'https://khadijaexpress.herokuapp.com/addvisit'
    var formData: any = new FormData();
    formData.append("nom", params.nom); // nom of etudiant
    formData.append("id", params.id); //id of monument
    formData.append("image", params.image); //image captured for monument
    formData.append("description", params.description); //image captured for monument
    // httpOptions.params = params;
    console.log(httpOptions)
    return this.http.post(api,formData, httpOptions).pipe(
      map(this.extractData),
      catchError(this.handleError));
  }



}
