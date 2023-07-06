import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as ContentTypeActions from './contentType.actions';
import { IContentType } from '../../entities/IContentType'; 

export const contentType_KEY =
    'contentType';

export interface ContentTypeState extends EntityState<IContentType> {
    loaded: boolean;
    error?: string | null;
}

export interface ContentTypePartialState {
    readonly [contentType_KEY]: ContentTypeState;
}

export const contentTypeAdapter: EntityAdapter<IContentType> =
    createEntityAdapter<IContentType>({
    selectId: (contentType) => contentType.sys.id
});

export const initialState: ContentTypeState = contentTypeAdapter.getInitialState({
    loaded: false,
    error: null
});

const contentTypeReducer = createReducer(
    initialState,
    
    on(ContentTypeActions.loadContentTypes, (state) => 
        contentTypeAdapter.removeAll({ ...state, loaded: false })
    ),

    on(ContentTypeActions.loadContentTypesSuccess, (state, { contentTypes }) => 
        contentTypeAdapter.upsertMany(contentTypes.items, { ...state, loaded: true })
    ),
    
    on(ContentTypeActions.loadContentTypesFailure, (state, { error }) =>
        ({ ...state, error, loaded: false })
    ),  
);

export function reducer(state: ContentTypeState | undefined, action: Action) {
  return contentTypeReducer(state, action);
}
