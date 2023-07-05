import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { loadContentTypes } from '../../+state/contentType/contentType.actions';
import * as fromContentTypes from '../../+state/contentType/contentType.reducers';
import * as ContentTypesSelectors from '../../+state/contentType/contentType.selectors';

@Injectable({ providedIn: 'root' })
export class ContentTypeFacade {
    
    contenttypeLoaded$ = this.store.pipe(select(ContentTypesSelectors.getContentTypeLoaded));  
    contenttype$ = this.store.pipe(select(ContentTypesSelectors.getAllContentType));  

    constructor(private store: Store<fromContentTypes.ContentTypePartialState>) {}

    load(): void {
        this.store.dispatch(loadContentTypes());
    }  
}
