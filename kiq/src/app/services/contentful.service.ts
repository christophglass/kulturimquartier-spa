import { Injectable } from '@angular/core';
import { createClient, Space, ContentfulClientApi, EntrySkeletonType, EntryCollection } from 'contentful';
import { from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContentfulService {

  private cdaClient: ContentfulClientApi<undefined>;

  constructor() {
    this.cdaClient = createClient({
      space: environment.contentful.space,
      accessToken: environment.contentful.accessToken
    });
   }

  getSpace(): Observable<Space> {
    return from(this.cdaClient.getSpace());
  }

  getNews(): Observable<EntryCollection<EntrySkeletonType, undefined, string>> {
    return from(this.cdaClient.getEntries(Object.assign( { content_type: environment.contentful.contentTypeIds.news } )));
  }
}
