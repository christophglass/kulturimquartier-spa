import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, tap, switchMap } from 'rxjs';
import * as actions from './contentType.actions';
import { ContentTypeCollection } from 'contentful';
import { ContentfulService } from '../../infrastructure/contentful.service';
import { IContentTypeCollection } from '../../entities/IContentType';

@Injectable()
export class ContentTypeEffects {
    
    loadContentTypes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.loadContentTypes),        
            switchMap(() => this.contentFulService.getContentTypes().pipe(
                map((contentTypes: ContentTypeCollection) => actions.loadContentTypesSuccess( { contentTypes: contentTypes as IContentTypeCollection } )),
                catchError((error) => of(actions.loadContentTypesFailure( { error } )))
            ))
        )        
    );

    loadContentTypesFailure$ = createEffect(() =>
        this.actions$.pipe(
            ofType(actions.loadContentTypesFailure),
            tap((error: any) => console.error('ContentTypes konnten nicht geladen werden.', error))
        ),
        { dispatch: false }
    );

  constructor(private actions$: Actions, private contentFulService: ContentfulService) {}
} 