import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store, Select } from '@ngxs/store';
import { UserState } from '../store/user/user.state';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router,
        private store: Store) { }

    canActivate(next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<any> {
        let isLoggedIn = this.store.selectSnapshot(UserState.isLoggedIn);

        if (isLoggedIn) {
            return of(true);
        } else {
            this.router.navigate(['/login']);
        }

    }
}