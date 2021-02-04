import {Component, OnInit} from '@angular/core';
import {NewsRss} from '../../news-rss';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  RssData: NewsRss;

  constructor() {
  }


  ngOnInit(): void {
    this.showNews();
  }


  async showNews(): Promise<void> {
    setTimeout(() => {
      this.RssData = JSON.parse(localStorage.getItem('rss'));

      localStorage.clear();
    }, 250);
  }

}
