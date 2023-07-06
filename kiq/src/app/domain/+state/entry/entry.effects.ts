import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, tap, switchMap } from 'rxjs';
import * as actions from './entry.actions';
import { EntryCollection, EntrySkeletonType } from 'contentful';
import { ContentfulService } from '../../infrastructure/contentful.service';
import { IEntryCollection } from '../../entities/IEntry';

@Injectable()
export class EntryEffects {
    
    loadEntries$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.loadEntries),        
            switchMap((props) => this.contentFulService.getEntriesFromContentTypeId(props.contentTypeId).pipe(
                map((entries: EntryCollection<EntrySkeletonType, undefined, string>) => actions.loadEntriesSuccess( { entries: entries as IEntryCollection } )),
                catchError((error) => of(actions.loadEntriesFailure( { error } )))
            ))
        )        
    );

    loadEntriesFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.loadEntriesFailure),
            tap((error: any) => console.error('Entries konnten nicht geladen werden.', error))
        ),
        { dispatch: false }
    );

  constructor(private actions$: Actions, private contentFulService: ContentfulService) {}
} 