import { Component, OnInit } from '@angular/core';
import { AuthService } from "../security/auth.service";
import { Router } from "@angular/router";
import { Http } from "@angular/http";
import { User } from "../../models/user";

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavMenuComponent implements OnInit {
    user = this.authService.user.email;

    constructor(public authService: AuthService, private http: Http, private router: Router) { }

    ngOnInit(): void {
        //this.user.name = this.authService.user.email;
    }

    logout(): void {
        this.http.get('connect/logout', { headers: this.authService.authJsonHeaders() })
            .subscribe(response => {
                this.authService.logout();
                this.router.navigate(['login']);
                this.authService.user = new User();
            },
            error => {
                // failed; TODO: add some nice toast / error handling
                alert(error.text());
                console.log(error.text());
            }
        );
    }
}
