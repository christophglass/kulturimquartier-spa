import { Component, Input, OnInit } from '@angular/core';
import { ContentType } from 'contentful';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  private _contentType?: ContentType;
  @Input() set contentType(value: ContentType) {
    this._contentType = value;
  }

  constructor() {}

  ngOnInit(): void {
      
  }

}
