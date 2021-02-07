import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/User';
import {Token} from '../models/Token';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {
  }

  private oauth(): any{
    const localToken = JSON.parse(localStorage.getItem('token'));
    const {access_token} = localToken;

    return  new HttpHeaders().set('Authorization', access_token);
  }

  create(user): Observable<User> {
    return this.httpClient.post<User>(`http://localhost:5002/users/create`, user);
  }

  login(user): Observable<User> {
    return this.httpClient.post<User>(`http://localhost:5002/users/login`, user);
  }

  exit(): Observable<Token> {
    return this.httpClient.delete<Token>(`http://localhost:5002/users/exit`,  {headers: this.oauth()});
  }

  createUserChannel(body): Observable<string> {
    return this.httpClient.post<string>(`http://localhost:5002/newspaper/create`, body, {headers: this.oauth()} );
  }


}

