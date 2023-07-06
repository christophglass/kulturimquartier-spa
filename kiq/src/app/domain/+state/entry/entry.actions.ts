import { createAction, props } from '@ngrx/store';
import { IEntryCollection } from '../../entities/IEntry';

export const loadEntries = createAction(
  '[Entries] Load Entriess',
  props<{ contentTypeId: string}>()
);

export const loadEntriesSuccess = createAction(
    '[Entries] Load Entries Success',
    props<{ entries: IEntryCollection }>()
);

export const loadEntriesFailure = createAction(
    '[Entries] Load Entries Failure',
    props<{ error: any }>()
);
