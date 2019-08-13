import { createSelector } from '@ngrx/store';
import * as fromAddressForm from '../reducers/address-form.reducer';
import { getAddressFormState } from '../reducers/reducers'



export const addressFormIsVisile = createSelector(
    getAddressFormState,
    fromAddressForm.getAddressFormVisible
)