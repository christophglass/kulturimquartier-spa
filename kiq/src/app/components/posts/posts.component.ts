import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { EntryFacade } from 'src/app/domain/application/entry/entry.facade';
import { IEntry } from 'src/app/domain/entities/IEntry';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {

  contentTypeId?: string;
  entries?: IEntry[];

  private homeContentId: string = 'home';
  private subs: Subscription;  
  
  constructor(private route: ActivatedRoute, private entryFacade: EntryFacade) {
    this.subs = new Subscription();
  }

  ngOnInit(): void {
    this.subscibeToRouteParams();    
  }

  ngOnDestroy(): void {
      this.subs.unsubscribe();      
  }

  private subscibeToRouteParams(): void {
    this.subs.add(
      this.route.params.subscribe((params: Params) => {
        this.contentTypeId = params['contentTypeId'] || this.homeContentId;
        this.subscribeToEntries();
      })
    );
  }

  private subscribeToEntries(): void {       
    this.subs.add(
      this.entryFacade.entries$.subscribe((entries: IEntry[]) => {
        this.entries = entries;
      })
    );

    this.entryFacade.load(this.contentTypeId || this.homeContentId);
  }
}
