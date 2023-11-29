import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { EntryFacade } from 'src/app/domain/application/entry/entry.facade';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {

  contentTypeId?: string;
  entryId?: string;
  entriesIds?: any[];

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
        this.entryId = params['entryId'] || '';
        this.subscribeToEntries();
      })
    );
  }

  private subscribeToEntries(): void {       
    this.subs.add(
      this.entryFacade.entriesIds$.subscribe((entriesIds: any[]) => {
        if (this.entryId && entriesIds.includes(this.entryId)) {
          this.entriesIds = [ this.entryId ];
        } else {
          this.entriesIds = entriesIds || [];
        }        
      })
    );

    this.entryFacade.load(this.contentTypeId || this.homeContentId);
  }
}
