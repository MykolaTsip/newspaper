import {Component, OnInit} from '@angular/core';
import {NewsRss} from '../../models/news-rss';
import {NewsFeed} from '../../models/news-feed';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  RssData: NewsRss;
  FeedData: NewsFeed;

  constructor() {
  }


  ngOnInit(): void {
    this.showNews();
  }


  async showNews(): Promise<void> {
    setTimeout(() => {
      if (JSON.parse(localStorage.getItem('rss'))) {
      this.RssData = JSON.parse(localStorage.getItem('rss'));
      } else {
        this.FeedData = JSON.parse(localStorage.getItem('feed'));
      }
    }, 300);
  }

  deleteItem(o): void {
    const index = this.RssData.rss.channel[0].item.indexOf(o);
    this.RssData.rss.channel[0].item.splice(index, 1);
  }

  deleteEntry(o): void {
    const index = this.FeedData.feed.entry.indexOf(o);
    this.FeedData.feed.entry.splice(index, 1);
  }

}
