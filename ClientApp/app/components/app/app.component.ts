import { Component, OnInit } from '@angular/core';
import { AuthService } from "../security/auth.service";
import { Http } from "@angular/http";
import { Router } from "@angular/router";

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(private authService: AuthService, private http: Http, private router: Router) { }

    // provide local page the user's logged in status (do we have a token or not)
    public isLoggedIn(): boolean {
        return this.authService.isLoggedIn;
    }

    // tell the server that the user wants to logout; clears token from server, then calls auth.service to clear token locally in browser
    public logout() {
        this.http.get('connect/logout', { headers: this.authService.authJsonHeaders() })
            .subscribe(response => {
                console.log(response);
                // clear token in browser
                this.authService.logout();
                // return to 'home' page
                this.router.navigate(['home']);
            },
            error => {
                // failed; TODO: add some nice toast / error handling
                alert(error.text());
                console.log(error.text());
            }
            );
    }
}
