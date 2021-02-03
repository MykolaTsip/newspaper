import {Component, OnInit} from '@angular/core';
import {NewsRss} from '../../news-rss';
import * as xml2js from 'xml2js';
import {ChannelService} from '../../services/channel.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {


  RssData: NewsRss;

  constructor(private router: Router, private channelService: ChannelService) {
  }


  ngOnInit(): void {
     // this.NasaRssData();
  }

  NasaRssData(): void {
    this.channelService.nasa()
      .subscribe(data => {
          console.log(data);
          xml2js.parseString(data, (err, result: NewsRss) => {
            this.RssData = result;

            if(!localStorage.getItem('rss')) {
              setTimeout(() => {
                localStorage.setItem('rss', JSON.stringify(this.RssData));
              }, 10);
            }
            else {
              setTimeout(() => {
                localStorage.removeItem('rss');
                localStorage.setItem('rss', JSON.stringify(this.RssData));
              }, 10);
            }

            console.log(this.RssData);
          });
        }
      );

    // this.router.navigate(['nasa', '_blank'], {state: {RssData: this.RssData}});

    setTimeout(() => {
      const url = this.router.serializeUrl(
        this.router.createUrlTree(['/nasa'], )
      );
      window.open(url, '_blank');
    }, 60);
  }

  RedditRssData(): void {
    this.channelService.reddit()
      .subscribe(data => {
          console.log(data);
          xml2js.parseString(data, (err, result: NewsRss) => {
            this.RssData = result;

            if(!localStorage.getItem('rss')) {
              setTimeout(() => {
              localStorage.setItem('rss', JSON.stringify(this.RssData));
              }, 10);
            }
            else {
              setTimeout(() => {
              localStorage.removeItem('rss');
              localStorage.setItem('rss', JSON.stringify(this.RssData));
              }, 10);
            }

            console.log(this.RssData);
          });
        }
      );

    // this.router.navigate(['reddit'], {state: {RssData: this.RssData}});


    setTimeout(() => {
      const url = this.router.serializeUrl(
        this.router.createUrlTree(['/reddit'], )
      );
      window.open(url, '_blank');
    }, 60);

  }

  MobileRssData(): void {
    this.channelService.mobiworldlive()
      .subscribe(data => {
          xml2js.parseString(data, (err, result: NewsRss) => {
            this.RssData = result;

            if(!localStorage.getItem('rss')) {
              setTimeout(() => {
                localStorage.setItem('rss', JSON.stringify(this.RssData));
              }, 10);
            }
            else {
              setTimeout(() => {
                localStorage.removeItem('rss');
                localStorage.setItem('rss', JSON.stringify(this.RssData));
              }, 10);
            }

            console.log(this.RssData);
          });
        }
      );

    // this.router.navigate(['mobileWorldLive'], {state: {RssData: this.RssData}});

    setTimeout(() => {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/mobileWorldLive'], )
    );
    window.open(url, '_blank');
    }, 60);

  }
}

export interface IRssData {
}
