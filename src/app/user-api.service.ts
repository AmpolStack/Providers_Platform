import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private UrlTemplate : string = 'https://localhost:7216/api/User/';
  constructor(private http : HttpClient) { }

  public logInWithCredentials(credentials : credentials) : Observable<User>{
    return this.http.post<User>(this.UrlTemplate + 'GetUserByCredentials',credentials)
  }
}

export interface credentials{
  email : string;
  password : string;
}