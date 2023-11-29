import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { loadEntries } from '../../+state/entry/entry.actions';
import * as fromEntries from '../../+state/entry/entry.reducers';
import * as EntriesSelectors from '../../+state/entry/entry.selectors';

@Injectable({ providedIn: 'root' })
export class EntryFacade {
    
    entriesLoaded$ = this.store.pipe(select(EntriesSelectors.getEntriesLoaded));  
    entries$ = this.store.pipe(select(EntriesSelectors.getAllEntries));  
    entry$ = (id: string) => this.store.pipe(select(EntriesSelectors.getEntryById(id)));
    entriesIds$ = this.store.pipe(select(EntriesSelectors.getEntryIds));

    constructor(private store: Store<fromEntries.EntryPartialState>) {}

    load(contentTypeName: string): void {
        this.store.dispatch(loadEntries( { contentTypeId: contentTypeName } ));
    }  
}
