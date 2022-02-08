import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivate,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import {
  ISFState
} from '@core/interfaces';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserState } from '@core/state/userState';

const STPIPROUTES = ['/satori-one-entity/', '/satori-one-person/', '/satori-two-entity/', '/satori-two-person/', '/satori-ltd-foreign-investors/', '/satori-ltd-us-tax-exempt/', '/additional-subscription-form/']

@Injectable({
  providedIn: 'root',
})
export class ClientRouteCheckAuthHomeGuard implements CanActivate {

  constructor(public store: Store<ISFState>, public router: Router) {
  }
  private currentState: RouterStateSnapshot;
  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    this.currentState = state;
    return this.store.select('userState').pipe(
      map((userState: UserState) => {
        switch (userState && userState.clientDetails && userState.clientDetails.clientId) {
          case 'STPIP':
           return this.currentState.url.includes("/subscription/") ? false :true;
          case 'TSQFS':
            let hasFalseURL = STPIPROUTES.find((value: string) =>
              this.currentState.url.includes(value)
            );
            return hasFalseURL ? false : true;
        }
        return false;
      }));
  }
}   