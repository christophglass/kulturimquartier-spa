import { Component, OnInit, OnDestroy, ChangeDetectorRef, Injector} from '@angular/core';
import { ContentTypeFacade } from './domain/application/contentType/contentType.facade';
import { Subscription } from 'rxjs';
import { IContentType } from './domain/entities/IContentType';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { sortBy } from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  
  title = 'Kultur im Quartier - Lübeck St. Lorenz-Süd';
  contentTypes?: IContentType[];
  mobileQuery: MediaQueryList;
  
  private _mobileQueryListener: () => void;
  private subs: Subscription = new Subscription();

  constructor(private contentTypesFacade: ContentTypeFacade, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();    
  }

  ngOnInit(): void {
      this.subs.add(
        this.contentTypesFacade.contenttype$.subscribe((contentTypes: IContentType[]) => this.contentTypes = this._orderContentTypes(contentTypes))
      );

      this.contentTypesFacade.load();
  }

  ngOnDestroy(): void {
      this.subs.unsubscribe();
      this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  routeMeTo(contentType: IContentType): void {
    this.router.navigate(['posts', contentType.sys.id ]);
  }

  private _orderContentTypes(contentTypes: IContentType[]): IContentType[] {
    return sortBy(contentTypes, ['name'])
  }
}
