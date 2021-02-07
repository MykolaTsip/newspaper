import {Component, OnInit, DoCheck} from '@angular/core';
import * as xml2js from 'xml2js';
import {ChannelService} from '../../services/channel.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NewsRss} from '../../models/news-rss';
import {NewsFeed} from '../../models/news-feed';
import {UserService} from '../../services/user.service';


@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {


  RssData: NewsRss;
  FeedData: NewsFeed;
  newsUser: string;
  userChannel: any;
  newTitle: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private channelService: ChannelService,
    private userService: UserService
  ) {
  }


  ngOnInit(): void {
  }


  NasaRssData(): void {
    this.channelService.nasa()
      .subscribe(data => {
          xml2js.parseString(data, (err, result: NewsRss) => {
            this.RssData = result;

            if (!localStorage.getItem('rss')) {

              localStorage.removeItem('feed');
              localStorage.setItem('rss', JSON.stringify(this.RssData));
            } else {
              localStorage.removeItem('rss');
              localStorage.removeItem('feed');
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

            if (!localStorage.getItem('feed')) {
              localStorage.removeItem('rss');
              localStorage.setItem('feed', JSON.stringify(this.FeedData));
            } else {
              localStorage.removeItem('feed');
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
            console.log(this.RssData);
            if (!localStorage.getItem('rss')) {
              localStorage.removeItem('feed');
              localStorage.setItem('rss', JSON.stringify(this.RssData));
            } else {
              localStorage.removeItem('rss');
              localStorage.removeItem('feed');
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

  addChannel(channel): void {
    console.log(channel);
    this.channelService.userChannel(channel)
      .subscribe(data => {
        xml2js.parseString(data, (err, result: NewsRss) => {
          this.RssData = result;

          if (this.RssData) {
            this.userService.createUserChannel({
              title: this.RssData.rss.channel[0].title[0],
              // @ts-ignore
              url: this.RssData.rss.channel[0]['atom:link'][0].$.href
            })
              .subscribe(value => this.userChannel = value);
          } else {
            alert('YOU ENTER BAD url ADDRESS !');
          }
          console.log(result);
        });
      });
  }

  showNews(): void {
    this.channelService.getUsersChannel()
      .subscribe(value => this.userChannel = value);
  }


  toChannel(channel: any): void {
    console.log(channel);
    this.channelService.userChannel(channel.url)
      .subscribe(data => {
          xml2js.parseString(data, (err, result: NewsRss) => {
            this.RssData = result;

            localStorage.removeItem('feed');
            localStorage.removeItem('rss');
            localStorage.setItem('rss', JSON.stringify(this.RssData));

            const url = this.router.serializeUrl(
              this.router.createUrlTree(['/myNews'])
            );
            window.open(url, '_blank');
          });
        }
      );
  }

  deleteChannel(id: any): void {
    this.activatedRoute.params
      .subscribe(data => {
        this.channelService.deleteChannelOfUser(id)
          .subscribe(value => console.log(value));
        this.channelService.getUsersChannel()
          .subscribe(value => this.userChannel = value);
      });
  }


  renameTitle(newTitle, id): void {
this.channelService.updateTitleOfNews(id, newTitle)
  .subscribe(value => {
    console.log(value);
    this.channelService.getUsersChannel()
      .subscribe(data => this.userChannel = data);
  });
  }
}

