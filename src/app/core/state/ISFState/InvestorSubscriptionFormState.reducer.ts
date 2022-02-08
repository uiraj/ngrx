import * as SubscriptionFormStateActions from './investorSubscriptionFormState.actions';
import { InvestorSubscriptionFormState } from './investorSubscriptionFormState.model';


export function InvestorSubscriptionFormReducer(state: InvestorSubscriptionFormState, action: SubscriptionFormStateActions.All): InvestorSubscriptionFormState {
    switch (action.type) {
        case SubscriptionFormStateActions.GET_FORM_DETAILS_SUCCESS:
            return new InvestorSubscriptionFormState({ ...state, subscriptionFormDetails: (action as SubscriptionFormStateActions.GetFormDetailsSuccess).payload });
        case SubscriptionFormStateActions.CHANGE_STATUS_SUCCESS:
            return new InvestorSubscriptionFormState({ ...state, subscriptionFormDetails: (action as SubscriptionFormStateActions.ChangeStatusSuccess).payload, ppmId: (action as SubscriptionFormStateActions.ChangeStatusSuccess).ppmId});
        default:
            return state;
    }
}