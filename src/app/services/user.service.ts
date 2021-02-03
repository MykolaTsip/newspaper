import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/User';
import {Token} from '../models/Token';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  create(user): Observable<User> {
    return  this.httpClient.post<User>(`http://localhost:5002/users/create`, user);
  }

 login(user): Observable<User> {
    return this.httpClient.post<User>(`http://localhost:5002/users/login`, user);
}

exit(tokens): Observable<Token> {
    return  this.httpClient.post<Token>(`http://localhost:5002/users/exit`, tokens);
}

}

