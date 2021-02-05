import {Component, OnInit, DoCheck} from '@angular/core';
import * as xml2js from 'xml2js';
import {ChannelService} from '../../services/channel.service';
import {Router} from '@angular/router';
import {NewsRss} from '../../models/news-rss';
import {NewsFeed} from '../../models/news-feed';


@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {


  RssData: NewsRss;
  FeedData: NewsFeed;

  constructor(
    private router: Router,
    private channelService: ChannelService,
  ) {
  }


  ngOnInit(): void {
  }



  NasaRssData(): void {
    this.channelService.nasa()
      .subscribe(data => {
          xml2js.parseString(data, (err, result: NewsRss) => {
            this.RssData = result;

            if(!localStorage.getItem('rss')) {
                localStorage.setItem('rss', JSON.stringify(this.RssData));
            }
            else {
                localStorage.removeItem('rss');
                localStorage.setItem('rss', JSON.stringify(this.RssData));
            }

            const url = this.router.serializeUrl(
              this.router.createUrlTree(['/nasa'])
            );
            window.open(url, '_blank');
          });
        }
      );

  }

  RedditRssData(): void {
    this.channelService.reddit()
      .subscribe(data => {
          xml2js.parseString(data, (err, result: NewsFeed) => {
            this.FeedData = result;
            console.log(this.FeedData);

            if(!localStorage.getItem('feed')) {
              localStorage.setItem('feed', JSON.stringify(this.FeedData));
            }
            else {
              localStorage.removeItem('feed');
              localStorage.setItem('feed', JSON.stringify(this.FeedData));
            }

            const url = this.router.serializeUrl(
              this.router.createUrlTree(['/reddit'])
            );
            window.open(url, '_blank');
          });
        }
      );

  }

  MobileRssData(): void {
    this.channelService.mobiworldlive()
      .subscribe(data => {
          xml2js.parseString(data, (err, result: NewsRss) => {
            this.RssData = result;

            if(!localStorage.getItem('rss')) {
                localStorage.setItem('rss', JSON.stringify(this.RssData));
            }
            else {
                localStorage.removeItem('rss');
                localStorage.setItem('rss', JSON.stringify(this.RssData));
            }


            const url = this.router.serializeUrl(
              this.router.createUrlTree(['/mobileWorldLive'])
            );
            window.open(url, '_blank');
          });
        }
      );
  }

}

