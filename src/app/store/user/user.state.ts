import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UserService } from './user.service';
import { DELETE_PREFER_CURRENCY, GET_CURRENCY_LIST, GET_RATE_LIST, LOG_IN_USER, LOG_OUT_USER, STORE_PREFER_CURRENCY } from './user.action';

interface UserModel {
    isLoggedIn: boolean,
    currencyList: any,
    currencyRateList: any,
    preferCurrencies: any
}

@State<UserModel>({
    name: 'UserState',
    defaults: {
        isLoggedIn: false,
        currencyList: null,
        currencyRateList: null,
        preferCurrencies: null
    }
})

@Injectable()
export class UserState {
    constructor(private userService: UserService, private router: Router) { }

    @Selector()
    public static isLoggedIn(state: UserModel) {
        return state.isLoggedIn;
    }

    @Selector()
    public static currencyList(state: UserModel) {
        return state.currencyList ? state.currencyList : null;
    }

    @Selector()
    public static rateList(state: UserModel) {
        return state.currencyRateList ? state.currencyRateList : null;
    }

    @Selector()
    public static filteredCurrencyList(state: UserModel) {
        if (state.preferCurrencies && state.preferCurrencies.length > 0) {
            return state.currencyList.filter(o1 => !state.preferCurrencies.find(o2 => (o1.code === o2.code)));
        } else {
            return state.currencyList;
        }
    }

    @Selector()
    public static preferCurrencies(state: UserModel) {
        return state.preferCurrencies ? state.preferCurrencies : null;
    }


    @Action(LOG_IN_USER)
    public getUser(
        { patchState }: StateContext<UserModel>,
        { payload }: LOG_IN_USER) {
        patchState({
            isLoggedIn: true
        });
    }

    @Action(LOG_OUT_USER)
    public logOutUser(
        { patchState }: StateContext<UserModel>) {
        patchState({
            isLoggedIn: false,
            preferCurrencies: null
        });
    }

    @Action(GET_CURRENCY_LIST)
    public getCurrencyList(
        { patchState }: StateContext<UserModel>) {
        return this.userService
            .getCurrencyList()
            .pipe(
                map(res => {
                    if (res.valid) {
                        const currencyList = [];
                        if (res.currencies) {
                            for (var key of Object.keys(res.currencies)) {
                                let entry = { code: key, descp: res.currencies[key] }
                                currencyList.push(entry);
                            }
                        }
                        patchState({
                            currencyList: currencyList
                        });
                    }
                }),
                catchError(err => {
                    patchState({
                        currencyList: { "message": "Unable to Retrieve Currency List" }
                    });
                    return '';
                })
            );
    }

    @Action(GET_RATE_LIST)
    public getRateList(
        { patchState }: StateContext<UserModel>) {
        return this.userService
            .getCurrencyRateList()
            .pipe(
                map(res => {
                    if (res.valid) {
                        const currencyRateList = [];
                        if (res.rates) {
                            for (var key of Object.keys(res.rates)) {
                                let entry = { code: key, rate: res.rates[key] }
                                currencyRateList.push(entry);
                            }
                        }
                        patchState({
                            currencyRateList: currencyRateList
                        });
                    }
                }),
                catchError(err => {
                    patchState({
                        currencyRateList: { "message": "Unable to Retrieve Rate List" }
                    });
                    return '';
                })
            );
    }

    @Action(STORE_PREFER_CURRENCY)
    public storePreferCurrency(
        { patchState, getState }: StateContext<UserModel>,
        { payload }: STORE_PREFER_CURRENCY) {

        const state = getState();
        const preferCurrencies = state.preferCurrencies ? [...state.preferCurrencies, payload] : [payload]
        patchState({
            preferCurrencies: preferCurrencies
        });
    }

    @Action(DELETE_PREFER_CURRENCY)
    public activeUser(
        { patchState, getState }: StateContext<UserModel>,
        { index }: DELETE_PREFER_CURRENCY) {

        const state = getState();
        patchState({
            preferCurrencies: [
                ...state.preferCurrencies.slice(0, index),
                ...state.preferCurrencies.slice(index + 1)
            ]
        });
    }

}