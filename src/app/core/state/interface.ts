import { UserState } from './userState';
import { InvestorSubscriptionFormState } from '../state/ISFState';
import { WorkflowType } from '../state/constant';

// import { IFormField, IValidation } from 'stp-shared-library';

export interface IUserStateModel {
    userDetails: IUserDetailsModel;
    clientDetails: IClientDetails;
    fundDetails: IFundDetailsModel[];
}
export interface IInvestorSubscriptionFormsState {
    userState: UserState;
    subscriptionFormState: InvestorSubscriptionFormState;
}

export interface IUserDetailsModel {
    role: string;
    userId: number;
    email: string;
    investorId: number;
    investorInfo: IUserInformation;
}

export interface IUserInformation {
    firstName: string;
    lastName: string;
    phone: string;
    company: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    investorType: string;
    usTaxExempt: string;
    foreignInvestor: string;
    qualifiedPurchaser: string;
    hedgeFunds: string;
    accreditedInvestor: string;
    portfolio: string;
    hedgeFundPortfolio: string;
}


export interface IFundDetailsModel {
    fundId: string;
    displayName: string;
    fundName: string;
    description: string;
    status: StatusModel;
    fundLogo: string;
    ppmId: string;
}

export interface StatusModel {
    NEWINV?: string;
    ADDINV?: string;
    RDMINV?: string;
}

export interface ISFState {
    userState: UserState;
    subscriptionFormState: InvestorSubscriptionFormState;
}

export interface IFundStateModel {
    fundDetails: IFundDetailsModel[];
}

export interface IFundSubscribedDetailModel {
    userId: number;
    investorId: number;
    investorInfo: IUserInformation;
}

export interface IFile {
    base64String: string;
    documentType: string;
    fileName: string;
    fileType: string;
    documentId: number;
}

export interface IBrokerData {
    name: IValueModel;
}

export interface ICompanyData {
    nameOfCompany: IValueModel;
    shareOfProfits: IValueModel;
}

export interface IEducationData {
    college: IValueModel;
    degree: IValueModel;
    major: IValueModel;
    year: IValueModel;
}

export interface IValueModel {
    value: string | Date | boolean | IFile[] | IValueModel[] | IBrokerData[] | ICompanyData[] | IEducationData[];
    controlType: string;
}

export interface ISubscriptionOneFormDetails {
    [key: string]: IValueModel;
}

export interface IOption {
    value: string;
    display: string;
}

export interface ISubscriptionFormDetailsModel {
    fundId: string;
    ppmApproved: boolean;
    isFormSubmitted: boolean;
    workflowType: WorkflowType;
    fields?: ISubscriptionOneFormDetails;
    isFormTouched?: boolean;
}

export interface ISubscriptionFormGetObjectModel extends ISubscriptionFormDetailsModel {
    fileUploadField?: IFile[];
    educationData?: IValueModel[];
    companyDataForInvestors?: IValueModel[];
    beneficialTrusteeData?: IValueModel[];
    beneficialOwnerData?: IValueModel[];
    companyDataForUnrestrictedInvestors?: IValueModel[];
    brokerData?: IValueModel[];
}

export interface ISubscriptionPersonFormTwoGetObjectModel extends ISubscriptionFormDetailsModel {
    fileUploadField?: IFile[];
    educationData?: IValueModel[];
    companyData?: IValueModel[];
    companyDataTwo?: IValueModel[];
    companyDataThree?: IValueModel[];
    brokerData?: IValueModel[];
    determinationOfRestrictedStatus?: string;
}
export interface ISubscriptionLtdFormObjectModel extends ISubscriptionFormDetailsModel {
    fileUploadField?: IFile[];
    companyData?: IValueModel[];
    companyDataTwo?: IValueModel[];
    companyDataThree?: IValueModel[];
    companyDataForInvestors?: IValueModel[];
    beneficialTrusteeData?: IValueModel[];
    beneficialOwnerData?: IValueModel[];
    companyDataForUnrestrictedInvestors?: IValueModel[];
    forRestrictedInvestors?: string;
}

export interface ISubscriptionFormStateModel {
    subscriptionFormDetails: ISubscriptionFormDetailsModel;
    ppmId:string;
}

export interface IClientDetails {
    clientId: string;
    name: string;
    longName: string;
    clientAddress: string;
    approverName: string;
    approverEmail: string;
    clientLogo: string;
    contactEmail: string;
    contactName: string;
    contactPhone: string;
}

export interface IState {
    name: string;
    abbreviation: string;
}


// Below interfaces are for form-builder changes


export interface ISubscriptionFormConfigModel {
    formId: string;
    formName: string;
    formDescription: string;
    projectConfiguration: IProjectConfiguration;
}

export interface IProjectConfiguration {
    isMatStepperLoaded?: boolean;
    summaryValueOrder?: [];
    pages?: IPage[];
    hideSummary?: boolean;
}
export interface IPage {
    fieldsClearOnClone?: string[];
    type?: string;
    label?: string;
    isSiteMapRequired?: boolean;
    // formConfiguration?: IFormConfiguration;
    previewConfiguration?: IPreviewReportConfig;
}
// export interface IFormConfiguration {
//     formConfig: IFormField[];
// }
export interface IPreviewReportConfig {
    id?: string;
    report_package_name?: string;
    benchmark?: string;
    accounts?: string[];
    accountList?: string[];
    start_date?: string;
    end_date?: string;
}

export interface IChangeStatusResponceModel{
    ppmId: string;
}
export interface FaqItem {
    id?: string;
    value: string;
    display: string;
  }