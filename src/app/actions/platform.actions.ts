import { Action } from '@ngrx/store';
import { actions } from './auth.actions';


export enum PlatformActionTypes {
    ToggleBlurPage = '[Platform] TOGGLE_BLUR_PAGE'
}



export class ToggleBlurPage implements Action {
    readonly type = PlatformActionTypes.ToggleBlurPage;
}


export type actions = ToggleBlurPage;



