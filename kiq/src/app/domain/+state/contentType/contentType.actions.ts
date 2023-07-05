import { createAction, props } from '@ngrx/store';
import { IContentTypeCollection } from '../../entities/IContentType';

export const loadContentTypes = createAction(
  '[ContentTypes] Load ContentTypess'  
);

export const loadContentTypesSuccess = createAction(
    '[ContentTypes] Load ContentTypes Success',
    props<{ contentTypes: IContentTypeCollection }>()
);

export const loadContentTypesFailure = createAction(
    '[ContentTypes] Load ContentTypes Failure',
    props<{ error: any }>()
);
