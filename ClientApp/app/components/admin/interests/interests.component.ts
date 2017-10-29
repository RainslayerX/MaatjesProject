import { Component, OnInit, ViewContainerRef, TemplateRef, ViewChild, ContentChild } from '@angular/core';
import { InterestsService } from "./interests.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

import * as $ from "jquery";
import { Interest } from "../../../models/interest.model";

@Component({
    selector: 'interests',
    templateUrl: './interests.component.html',
    styles: [':host { width: 100%; }'],
    providers: [InterestsService],
})
export class InterestsComponent implements OnInit {
    interests: Interest[] = [];
    selectedInterest: Interest = new Interest();
    formTitle: string;
    errorMessage: string;

    isCreating: boolean = false;

    public deleteModal: BsModalRef;
    public config = {
        animated: true,
        keyboard: true,
        backdrop: true,
        ignoreBackdropClick: true
    };
    public deleteModalContent: any = {};

    @ViewChild('formModal') formModal: ModalDirective;

    constructor(private service: InterestsService, private modalService: BsModalService) { }

    ngOnInit(): void {
        this.service.getInterests().subscribe(interests => this.interests = interests);
    }

    createInterest(): void {
        this.service.addInterest(this.selectedInterest).subscribe(result => {
            this.formModal.hide();
            this.service.getInterests().subscribe(interests => this.interests = interests);
        }, error => this.errorMessage = <any>error);
    }

    updateInterest() {
        this.service.updateInterest(this.selectedInterest.interestId).subscribe(result => {
            this.formModal.hide();
            this.service.getInterests().subscribe(interests => this.interests = interests);
        });
    }

    openCreateModal(template: TemplateRef<any>): void {
        this.formTitle = "Nieuwe Interrese";
        this.isCreating = true;
        this.selectedInterest = new Interest();
        this.formModal.show();
    }

    openDetailsModal(template: TemplateRef<any>, interest: Interest): void {
        this.formTitle = "Wijzig Interrese";
        this.isCreating = false;
        this.selectedInterest = interest;
        this.formModal.show();
    }

    deleteInterest(template: TemplateRef<any>, interest: Interest): void {
        this.deleteModal = this.modalService.show(template, Object.assign({}, this.config, { class: 'darker-bg' }));
        this.deleteModalContent.title = 'Waarschuwing';
        this.deleteModalContent.bodyText = 'Weet u zeker dat u deze interrese wilt verwijderen?';
        this.deleteModalContent.okAction = () => {
            this.service.deleteInterest(interest.interestId).subscribe(result => {
                this.deleteModal.hide();
                this.formModal.hide();
                this.service.getInterests().subscribe(interests => this.interests = interests);
            });
        };
    }
}