import { Action } from '@ngrx/store';



export enum PlatformActionTypes {
    ToggleBlurPage = '[Platform] TOGGLE_BLUR_PAGE',
}



export class ToggleBlurPage implements Action {
    readonly type = PlatformActionTypes.ToggleBlurPage;
}


export type actions = ToggleBlurPage;



