import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ContentTypeState, contentTypeAdapter, contentType_KEY } from './contentType.reducers';

export const getContentTypeState = createFeatureSelector<ContentTypeState>(contentType_KEY);

const { selectAll, selectEntities } = contentTypeAdapter.getSelectors();

export const getContentTypeLoaded = createSelector(
  getContentTypeState,
  (state: ContentTypeState) => state.loaded
);

export const getContentTypeError = createSelector(
  getContentTypeState,
  (state: ContentTypeState) => state.error
);

export const getAllContentType = createSelector(
  getContentTypeState,
  (state: ContentTypeState) => selectAll(state)
);

export const getContentTypeEntities = createSelector(
  getContentTypeState,
  (state: ContentTypeState) => selectEntities(state)
);
