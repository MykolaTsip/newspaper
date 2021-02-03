import {Component, Input, OnInit} from '@angular/core';
import {NewsRss} from '../../news-rss';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
   RssData: NewsRss;

  constructor(private activatedRoute: ActivatedRoute) {
    this.RssData = JSON.parse(localStorage.getItem('rss'));
    setTimeout(() => {
    localStorage.removeItem('rss');
    }, 10);
  }



  ngOnInit(): void {
  }

}
