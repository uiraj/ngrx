import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { environment } from '../../../environments/environment';

import { retry, map, delay } from 'rxjs/operators';
import { IChangeStatusResponceModel, IClientDetails, IFundDetailsModel, ISubscriptionFormConfigModel, ISubscriptionFormDetailsModel, IUserDetailsModel } from '../../core/state/interface';
import { GetType, WorkflowType } from '../../core/state/constant';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private RETRY_TIMES: number = 0;
  private useLocalApi: boolean = true;

  constructor(private http: HttpClient) {
  }

  public getUserDetails(): Observable<IUserDetailsModel> {
    if (this.useLocalApi) {
      return this.get('userDetails', GetType.USER);
    } else {
      return this.http.get<IUserDetailsModel>(`${environment.apiBase}/api/investorsubscription/user/getaccountinfo`);
    }
  }

  public GetAvailableFundDetails(): Observable<IFundDetailsModel[]> {
    if (this.useLocalApi) {
      return this.get('fundList', GetType.FUND);
    } else {
       return this.http.get<IFundDetailsModel[]>(`${environment.apiBase}/api/investorsubscription/user/getuserfunds`);
    }
  }
  // save userdetails

  public saveUserAccountDetails(payload: IUserDetailsModel): Observable<void> {
    if (this.useLocalApi) {
      return of(undefined);
    }
    else {
      return this.http.post<void>(`${environment.apiBase}/api/investorsubscription/user/saveaccountinfo`, payload,
        { withCredentials: true });
    }
  }

  // get form Details
  public getFundDetails(fundId: string, workflowType: WorkflowType): Observable<ISubscriptionFormDetailsModel> {
    if (this.useLocalApi) {
      return this.get(fundId, GetType.SATORIFORM);
    } else {
      return this.http.get<ISubscriptionFormDetailsModel>(`${environment.apiBase}/api/investorsubscriptionworkflow/subscription/getsubscription/fund/${fundId}/workflowType/${workflowType}`);
    }
  }

  // get form Config
  public getFundConfiguration(fundId: string, workflowType:WorkflowType): Observable<ISubscriptionFormConfigModel> {
    if (this.useLocalApi){
       return this.get(fundId, GetType.FORM_CONFIG);
    }else{
      return this.http.get<ISubscriptionFormConfigModel>(`${environment.apiBase}/api/investorsubscriptionworkflow/subscription/getformconfig/fundid/${fundId}/${workflowType}`, { withCredentials: true });
    }
  }

  public changeStatus(payload: ISubscriptionFormDetailsModel): Observable<IChangeStatusResponceModel> {
    if (this.useLocalApi) {
      const obj:IChangeStatusResponceModel = {       
        ppmId:'7ec7a4b6-9bb3-4d46-bf74-a7cd21cbd8b6'
      }
      return of(obj).pipe(delay(2000));
    } else {
       return this.http.post<IChangeStatusResponceModel>(`${environment.apiBase}/api/investorsubscriptionworkflow/subscription/savesubmitsubscription`, payload, { withCredentials: true });
    }
  }

  public getInvestorClientDetails(): Observable<IClientDetails> {
    if (this.useLocalApi) {
      return this.get('clientDetails', GetType.CLIENT);
    } else {
       return this.http.get<IClientDetails>(`${environment.apiBase}/api/investorsubscription/user/getinvsubclientinfo`);
    }
  }
  public getBase64ForPPMDownload(ppmId:string): Observable<string> {
    if (this.useLocalApi) {
      return of(undefined).pipe(delay(2000));
    } else {
       return this.http.get<string>(`${environment.apiBase}/api/investorsubscriptionworkflow/subscription/getppmdocument/ppmid/${ppmId}`);
    }
  }

 public logOut(): Observable<void> {
    if (this.useLocalApi) {
      return of(undefined);
    } else {
       return this.http.get<void>(`${environment.apiBase}/Login/Logout`);
    }
  }

  private get(payload: string, type: GetType): Observable<any> {
    return this.http.get(`api/${type}/${payload}.json`).pipe(retry(this.RETRY_TIMES));
  }
}
    