import { Component, OnInit } from '@angular/core';
import { AuthService } from "../security/auth.service";
import { Router } from "@angular/router";
import { Http } from "@angular/http";

@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavMenuComponent implements OnInit {
    user = { name: "USER", role: "ADMIN" };

    constructor(private authService: AuthService, private http: Http, private router: Router) { }

    ngOnInit(): void {

    }

    logout(): void {
        this.http.post('api/account/loggoff', { headers: this.authService.contentHeaders() })
            .subscribe(response => {
                this.authService.logout();
                this.router.navigate(['login']);
            });
    }
}
