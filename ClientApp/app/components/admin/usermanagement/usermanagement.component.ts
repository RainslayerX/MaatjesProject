import { Component, OnInit, ViewContainerRef, TemplateRef, ViewChild, ContentChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http } from "@angular/http";

import { BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

import * as $ from "jquery";
import { User } from "../../../models/user";
import { AuthService } from "../../security/auth.service";

@Component({
    selector: 'usermanagement',
    templateUrl: './usermanagement.component.html',
    styles: [':host { width: 100%; }']
})
export class UserManagementComponent implements OnInit {
    users: User[] = [];
    currentUser: User = new User();
    isCreating: boolean = false;
    inputEmail: string = "";
    inputRole: string = "";

    @ViewChild('formModal') formModal: ModalDirective;

    public deleteModal: BsModalRef;
    public config = {
        animated: true,
        keyboard: true,
        backdrop: true,
        ignoreBackdropClick: true
    };
    public deleteModalContent: any = {};

    constructor(private http: Http, private authService: AuthService, private modalService: BsModalService) { }

    ngOnInit(): void {
        this.getUsers();
    }

    getUsers(): void {
        this.http.get('api/account/users', { headers: this.authService.contentHeaders() })
            .subscribe(x => this.users = x.json());
    }

    openCreateModal(template: TemplateRef<any>): void {
        this.isCreating = true;

        this.currentUser = new User();

        this.formModal.show();
    }

    openDetailsModal(template: TemplateRef<any>, user: User): void {
        this.isCreating = false;

        this.currentUser = user;

        this.formModal.show();
    }

    deletePerson(template: TemplateRef<any>, user: User): void {
        this.deleteModalContent.title = 'Waarschuwing';
        this.deleteModalContent.bodyText = 'Weet u zeker dat u ' + user.email + ' wilt verwijderen?';
        this.deleteModal = this.modalService.show(template, Object.assign({}, this.config, { class: 'darker-bg' }));
        this.deleteModalContent.okAction = () => {
            this.http.delete('api/account/' + user.email, { headers: this.authService.authJsonHeaders() }).subscribe(result => {
                this.deleteModal.hide();
                this.formModal.hide();
                this.getUsers();
                this.currentUser = new User();
            });
        };
    }

    createUser(): void {
        var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        var signs = "!@#$%^&*)}]"
        var password = "";

        for (var i = 0; i < 4; i++)
            password += letters.charAt(Math.floor(Math.random() * letters.length));
        for (var i = 0; i < 2; i++)
            password += Math.floor(Math.random() * 10);
        password += signs.charAt(Math.floor(Math.random() * signs.length));

        let body = { 'email': this.inputEmail, 'password': password, 'confirmPassword': password };
        this.http.post('api/account/register', JSON.stringify(body), { headers: this.authService.authJsonHeaders() })
            .subscribe(response => {
                if (response.status == 200) {
                    alert("Gebruiker is aangemaakt, het wachtwoord voor deze gebruiker is: " + password);
                    this.formModal.hide();
                    this.getUsers();
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