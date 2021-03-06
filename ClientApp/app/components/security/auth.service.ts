﻿import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { OpenIdDictToken } from './OpenIdDictToken'
import { User } from "../../models/user";

@Injectable()
export class AuthService {
    public isLoggedIn: boolean = false;
    public user: User = new User();

    constructor(private http: Http) { }

    // for requesting secure data using json
    authJsonHeaders() {
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Accept', 'application/json');
        header.append('Authorization', 'Bearer ' + sessionStorage.getItem('bearer_token'));
        return header;
    }

    // for requesting secure data from a form post
    authFormHeaders() {
        let header = new Headers();
        header.append('Content-Type', 'application/x-www-form-urlencoded');
        header.append('Accept', 'application/json');
        header.append('Authorization', 'Bearer ' + sessionStorage.getItem('bearer_token'));
        return header;
    }

    // for requesting unsecured data using json
    jsonHeaders() {
        let header = new Headers();
        header.append('Content-Type', 'application/json');
        header.append('Accept', 'application/json');
        return header;
    }

    // for requesting unsecured data using form post
    contentHeaders() {
        let header = new Headers();
        header.append('Content-Type', 'application/x-www-form-urlencoded');
        header.append('Accept', 'application/json');
        return header;
    }

    // After a successful login, save token data into session storage
    // note: use "localStorage" for persistent, browser-wide logins; "sessionStorage" for per-session storage.
    login(responseData: OpenIdDictToken) {
        let access_token: string = responseData.access_token;
        let expires_in: number = responseData.expires_in;
        sessionStorage.setItem('access_token', access_token);
        sessionStorage.setItem('bearer_token', access_token);
        // TODO: implement meaningful refresh, handle expiry 
        sessionStorage.setItem('expires_in', expires_in.toString());

        this.isLoggedIn = true;
    }

    // called when logging out user; clears tokens from browser
    logout() {
        //localStorage.removeItem('access_token');
        this.isLoggedIn = false;
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('bearer_token');
        sessionStorage.removeItem('expires_in');
        return;
    }

    // simple check of logged in status: if there is a token, we're (probably) logged in.
    // ideally we check status and check token has not expired (server will back us up, if this not done, but it could be cleaner)
    loggedIn() {
        this.isLoggedIn = sessionStorage.getItem('bearer_token') != null;

        if (this.loggedIn && this.user.sub == "")
            this.http.get('api/userinfo', { headers: this.authJsonHeaders() })
                .subscribe(x => { console.log(x.json()); this.user = x.json() });

        return this.isLoggedIn;
    }
}