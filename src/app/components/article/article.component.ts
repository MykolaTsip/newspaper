import {Component, Input, OnInit} from '@angular/core';
import {NewsRss} from '../../news-rss';
import {ActivatedRoute, Router} from '@angular/router';
import {DataTransferService} from '../../data-transfer.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
   RssData: NewsRss;

  constructor(private activatedRoute: ActivatedRoute, private dataTransferService: DataTransferService) {
  }



  ngOnInit(): void {
    // this.RssData = JSON.parse(localStorage.getItem('rss'));
    // setTimeout(() => {
    // localStorage.removeItem('rss');
    // }, 10);
    this.activatedRoute.params.subscribe(value => {
    console.log(this.dataTransferService.getRssWithDataTransfer());
    this.RssData = this.dataTransferService.getRssWithDataTransfer();
    });

  }


}
