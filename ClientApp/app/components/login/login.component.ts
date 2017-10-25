import { Component, OnInit } from '@angular/core';
import { AuthService } from "../security/auth.service";
import { Http } from "@angular/http";
import { Router } from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
/** login component*/
export class LoginComponent implements OnInit {
    email: string;
    password: string;

    constructor(private authService: AuthService, private http: Http, private router: Router) { }

    /** Called by Angular after login component initialized */
    ngOnInit(): void { }

    login(): void {
        this.authService.logout();
        let body = 'username=' + this.email + '&password=' + this.password + '&grant_type=password';

        this.http.post('connect/token', body, { headers: this.authService.contentHeaders() })
            .subscribe(response => {
                // success, save the token to session storage
                this.authService.login(response.json());
                this.router.navigate(['home']);
            },
            error => {
                // failed
                console.log(JSON.stringify(error));
            }
            );
    }

    register(): void {
        let body = { 'email': this.email, 'password': this.password, 'confirmPassword': this.password };

        this.http.post('api/account/register', JSON.stringify(body), { headers: this.authService.jsonHeaders() })
            .subscribe(response => {
                if (response.status == 200) {
                    this.router.navigate(['login']);
                    alert("gelukt");
                } else {
                    alert(response.json().error);
                    console.log(response.json().error);
                }
            },
            error => {
                alert(error.text());
                console.log(error.text());
            });
    }
}