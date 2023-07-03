import { Component, OnInit } from '@angular/core';
import { ContentfulService } from './services/contentful.service';
import { Space, EntryCollection, EntrySkeletonType} from 'contentful';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'kiq';

  constructor(private contentfulService: ContentfulService) {}

  ngOnInit(): void {
      this.contentfulService.getSpace().subscribe((space: Space) => console.log(space));
      this.contentfulService.getNews().subscribe((news: EntryCollection<EntrySkeletonType, undefined, string>) => console.log(news));
  }
}
