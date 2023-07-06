import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Entriestate, entryAdapter, entry_KEY } from './entry.reducers';

export const getEntriestate = createFeatureSelector<Entriestate>(entry_KEY);

const { selectAll, selectEntities } = entryAdapter.getSelectors();

export const getEntriesLoaded = createSelector(
  getEntriestate,
  (state: Entriestate) => state.loaded
);

export const getEntriesError = createSelector(
  getEntriestate,
  (state: Entriestate) => state.error
);

export const getAllEntries = createSelector(
  getEntriestate,
  (state: Entriestate) => selectAll(state)
);

export const getEntryEntities = createSelector(
  getEntriestate,
  (state: Entriestate) => selectEntities(state)
);
