import { Component, OnInit, ViewContainerRef, TemplateRef, ViewChild, ContentChild } from '@angular/core';
import { ElderlyPerson } from "../../models/elderlypeople.model";
import { ElderlyPersonsService } from "./elderlypersons.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

import { PersonInterestsComponent } from "../personinterests/personinterests.component";

import * as $ from "jquery";

@Component({
    selector: 'elderlypersons',
    templateUrl: './elderlypersons.component.html',
    styles: [':host { width: 100%; }'],
    providers: [ElderlyPersonsService],
})
export class ElderlyPersonsComponent implements OnInit {
    elderlyPersons: ElderlyPerson[] = [];
    selectedElderlyPerson: ElderlyPerson = new ElderlyPerson();
    personForm: FormGroup;
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
    @ViewChild(PersonInterestsComponent) personInterests: PersonInterestsComponent;

    constructor(private service: ElderlyPersonsService, private fb: FormBuilder, private modalService: BsModalService) {
        this.personForm = this.fb.group({
            name: [null, Validators.required],
            email: '',
            phoneNumber: null,
            wheelChair: false,
            dementing: false,
            department: '',
            city: ''
        });
    }

    ngOnInit(): void {
        this.service.getElderlyPersons().subscribe(elderlyPersons => this.elderlyPersons = elderlyPersons);
    }

    formSubmit(): void {
        if (this.isCreating) {
            this.service.addElderlyPerson(this.personForm.value).subscribe(result => {
                console.log("works");
                //$('#formModal').modal('hide');
                this.formModal.hide();
                this.service.getElderlyPersons().subscribe(elderlyPersons => this.elderlyPersons = elderlyPersons);
            }, error => this.errorMessage = <any>error);
        }
        else {
            var person = this.personForm.value;
            person.personId = this.selectedElderlyPerson.personId;
            this.service.updateElderlyPerson(person).subscribe(result => {
                //$('#formModal').modal('hide');
                this.formModal.hide();
                this.service.getElderlyPersons().subscribe(elderlyPersons => this.elderlyPersons = elderlyPersons);
            });
        }
    }

    openCreateModal(template: TemplateRef<any>): void {
        this.formTitle = "Nieuwe Oudere";
        this.isCreating = true;

        this.personForm.reset();
        this.personForm.controls['name'].setValue('');
        this.personForm.controls['email'].setValue('');
        this.personForm.controls['phoneNumber'].setValue(null);
        this.personForm.controls['wheelChair'].setValue(false);
        this.personForm.controls['dementing'].setValue(false);
        this.personForm.controls['department'].setValue('');
        this.personForm.controls['city'].setValue('');

        //$('#formModal').modal('show');
        //this.formModal = this.modalService.show(template);
        this.formModal.show();
    }

    openDetailsModal(template: TemplateRef<any>, person: ElderlyPerson): void {
        this.isCreating = false;
        this.personInterests.update(person.personId);

        this.selectedElderlyPerson = person;
        this.personForm.controls['name'].setValue(person.name);
        this.personForm.controls['email'].setValue(person.email);
        this.personForm.controls['phoneNumber'].setValue(person.phoneNumber);
        this.personForm.controls['wheelChair'].setValue(person.wheelChair);
        this.personForm.controls['dementing'].setValue(person.dementing);
        this.personForm.controls['department'].setValue(person.department);
        this.personForm.controls['city'].setValue(person.city);

        //$('#formModal').modal('show');
        //this.formModal = this.modalService.show(template, Object.assign({}, this.config, { class: 'modal-lg' }));
        this.formModal.show();
    }

    deletePerson(template: TemplateRef<any>, person: ElderlyPerson): void {
        this.deleteModal = this.modalService.show(template, Object.assign({}, this.config, { class: 'darker-bg' }));
        this.deleteModalContent.title = 'Waarschuwing';
        this.deleteModalContent.bodyText = 'Weet u zeker dat u ' + person.name + ' wilt verwijderen?';
        this.deleteModalContent.okAction = () => {
            this.service.deleteElderlyPerson(person.personId).subscribe(result => {
                this.deleteModal.hide();
                //$('#formModal').modal('hide');
                this.formModal.hide();
                this.service.getElderlyPersons().subscribe(elderlyPersons => this.elderlyPersons = elderlyPersons);
            });
        };
    }
}