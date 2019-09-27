import * as ListRequestActions from '../actions/list-requests.actions';
import { ListRequestsActionTypes } from '../actions/list-requests.actions';


export interface State {
    requests: any[],
    error: "",
    loading: boolean,

}

const initialState: State = {
    requests: [],
    error: "",
    loading: false
}

export function listRequestReducer(state: State = initialState, action: ListRequestActions.actions) {

    switch (action.type) {
        case ListRequestsActionTypes.GetListRequest:
            return {
                ...state,
                loading: true
            }

        case ListRequestsActionTypes.GetListRequestSuccess:
            return {
                ...state,
                loading: false,
                requests: action.payload.requests,
                error: ""
            }

        case ListRequestsActionTypes.GetListRequestError:
            return {
                ...state,
                loading: false,
                requests: [],
                error: action.payload.error
            }



        default:
            return state;
    }

}

export const getListRequestsState = (state: State) => state;
export const getListRequets = (state: State) => state.requests;
export const getListRequetsError = (state: State) => state.error;
export const getListRequetsIsLoading = (state: State) => state.loading;