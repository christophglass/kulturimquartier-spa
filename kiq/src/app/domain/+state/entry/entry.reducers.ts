import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as EntryActions from './entry.actions';
import { IEntry } from '../../entities/IEntry'; 

export const entry_KEY =
    'entry';

export interface Entriestate extends EntityState<IEntry> {
    loaded: boolean;
    error?: string | null;
}

export interface EntryPartialState {
    readonly [entry_KEY]: Entriestate;
}

export const entryAdapter: EntityAdapter<IEntry> =
    createEntityAdapter<IEntry>({
    selectId: (entry) => entry.sys.id
});

export const initialState: Entriestate = entryAdapter.getInitialState({
    loaded: false,
    error: null
});

const entryReducer = createReducer(
    initialState,
    
    on(EntryActions.loadEntries, (state) => 
        entryAdapter.removeAll({ ...state, loaded: false })
    ),

    on(EntryActions.loadEntriesSuccess, (state, { entries }) => 
        entryAdapter.upsertMany(entries.items, { ...state, loaded: true })
    ),
    
    on(EntryActions.loadEntriesFailure, (state, { error }) =>
        ({ ...state, error, loaded: false })
    ),  
);

export function reducer(state: Entriestate | undefined, action: Action) {
  return entryReducer(state, action);
}
