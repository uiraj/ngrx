import {
    IUserDetailsModel, IUserStateModel, IFundDetailsModel, IClientDetails, ISubscriptionFormDetailsModel, StatusModel
} from '@core/interfaces';


export class UserState {
    public userDetails: IUserDetailsModel;
    public clientDetails: IClientDetails;
    public fundDetails: IFundDetailsModel[];
    constructor(payload: IUserStateModel) {
        Object.assign(this, payload);
    }

    public updateFundStatus(payload: ISubscriptionFormDetailsModel): IFundDetailsModel[] {
        const index: number = this.fundDetails.findIndex((f: IFundDetailsModel) => f.fundId === payload.fundId);
        let newStatus: StatusModel={};
        if (index >= 0) {
            const fund: IFundDetailsModel = this.fundDetails[index];
            Object.assign(newStatus, fund.status)
            if (fund.status && fund.status.NEWINV === undefined) {
                newStatus.NEWINV = 'Subscription Form In Progress';
            } else if (fund.status && fund.status.NEWINV === 'Subscription Form In Progress') {
                if (payload.ppmApproved && payload.isFormSubmitted) {
                    newStatus.NEWINV = 'Pending Investor Signature';
                }
            } else if (fund.status && payload.workflowType === 'ADDINV' && fund.status.NEWINV === 'Completed') {
                if(fund.status.ADDINV === undefined || fund.status.ADDINV === 'Completed'){
                    newStatus.ADDINV = 'Subscription Form In Progress';
                }else if (fund.status.ADDINV=== 'Subscription Form In Progress' && payload.isFormSubmitted) {
                    newStatus.ADDINV = 'Pending Investor Signature';
                }
            } else if (fund.status && payload.workflowType === 'RDMINV' && fund.status.NEWINV === 'Completed' && (fund.status.RDMINV === undefined || fund.status.RDMINV === 'Completed')) {
                newStatus.RDMINV = 'Subscription Form In Progress';
            }
            const newFundDetails: IFundDetailsModel[] = [...this.fundDetails];
            newFundDetails.splice(index, 1, { ...fund, status: newStatus });
            return newFundDetails;
        }
        return this.fundDetails;
    }
}