import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
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

  nasa(): Observable<any> {
    return this.httpClient.get<any>(`https://www.nasa.gov/rss/dyn/breaking_news.rss`, this.requestOptions);
  }

  reddit(): Observable<any> {
  return   this.httpClient.get<any>(`https://www.reddit.com/.rss`, this.requestOptions);
  }

  mobiworldlive(): Observable<any> {
   return  this.httpClient.get<any>(`https://www.mobileworldlive.com/latest-stories/feed`, this.requestOptions);
  }

}
