import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  constructor(private httpClient: HttpClient) {
  }

  private requestOptions: object = {
    observe: 'body',
    responseType: 'text'
  };

  private oauth(): any {
    const localToken = JSON.parse(localStorage.getItem('token'));
    const {access_token} = localToken;

    return new HttpHeaders().set('Authorization', access_token);
  }

  nasa(): Observable<any> {
    return this.httpClient.get<any>(`https://www.nasa.gov/rss/dyn/breaking_news.rss`, this.requestOptions);
  }

  reddit(): Observable<any> {
    return this.httpClient.get<any>(`https://www.reddit.com/.rss`, this.requestOptions);
  }

  mobiworldlive(): Observable<any> {
    return this.httpClient.get<any>(`https://www.mobileworldlive.com/latest-stories/feed`, this.requestOptions);
  }

  userChannel(channelURL): Observable<any> {
    return this.httpClient.get<any>(channelURL, this.requestOptions);
  }

  getUsersChannel(): Observable<any> {
    return this.httpClient.get(`http://localhost:5002/newspaper/newsToUser`, {headers: this.oauth()});
  }

  deleteChannelOfUser(id): Observable<any> {
    return this.httpClient.delete(`http://localhost:5002/newspaper/delete/${id}`, {headers: this.oauth()});
  }

  updateTitleOfNews(id, title): Observable<any> {
    console.log(id, title);
    return this.httpClient.get<any>(`http://localhost:5002/newspaper/update/${title}/${id}`, {headers: this.oauth()});
  }

}
