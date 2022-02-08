import * as ISFStateActions from './userState.actions';
import * as SubscriptionFormStateActions from '@core/state/investorSubscriptionFormState';
import { UserState } from './userState.model';

export function userReducer(state: UserState, action: ISFStateActions.All | SubscriptionFormStateActions.All): UserState {
    switch (action.type) {
        case ISFStateActions.GET_USER_DETAILS_SUCCESS:
            return new UserState({ ...state, userDetails: (action as ISFStateActions.GetUserDetailsSuccess).payload });
        case ISFStateActions.GET_CLIENT_DETAILS_SUCCESS:
            return new UserState({ ...state, clientDetails: (action as ISFStateActions.GetClientDetailsSuccess).payload });
        case ISFStateActions.GET_AVAILABLE_FUNDS_SUCCESS:
            return new UserState({ ...state, fundDetails: (action as ISFStateActions.GetAvailableFundDetailsSuccess).payload });
        case ISFStateActions.SAVE_USER_ACCOUNT_DETAILS_SUCCESS:
            return new UserState({ ...state, userDetails: (action as ISFStateActions.SaveUserAccountDetailsSuccess).payload });
        case SubscriptionFormStateActions.CHANGE_STATUS_SUCCESS:
            return new UserState({ ...state,
                fundDetails: state.updateFundStatus((action as SubscriptionFormStateActions.ChangeStatusSuccess).payload) });
        default:
            return state;
    }
}