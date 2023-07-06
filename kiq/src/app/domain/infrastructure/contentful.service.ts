import { Injectable } from '@angular/core';
import { createClient, ContentfulClientApi, ContentTypeCollection, EntryCollection, EntrySkeletonType } from 'contentful';
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

  getContentTypes(): Observable<ContentTypeCollection> {
    return from(this.cdaClient.getContentTypes());
  }

  getEntriesFromContentTypeId(contentTypeId: string): Observable<EntryCollection<EntrySkeletonType, undefined, string>> {
    return from(this.cdaClient.getEntries((Object.assign({ content_type: contentTypeId }, {} ))));
  }
}
