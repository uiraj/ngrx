import {
    ISubscriptionFormConfigModel,
    ISubscriptionFormDetailsModel, ISubscriptionFormStateModel
} from '@core/interfaces';

export class InvestorSubscriptionFormState {
    public subscriptionFormConfig: ISubscriptionFormConfigModel;
    public subscriptionFormDetails: ISubscriptionFormDetailsModel;
    public ppmId:string;

    constructor(payload: ISubscriptionFormStateModel) {
        Object.assign(this, payload);
    }
}