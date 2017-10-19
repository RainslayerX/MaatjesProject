import { Component, OnInit, ViewContainerRef, TemplateRef, ViewChild, ContentChild } from '@angular/core';
import { Match, MatchDTO } from "../../models/match.model";
import { MatcherService } from "./matcher.service";

import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Observable";

import { BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { Person } from "../../models/person.model";
import { ElderlyPersonsService } from "../elderlypersons/elderlypersons.service";
import { VolunteersService } from "../volunteers/volunteers.service";

@Component({
    selector: 'matcher',
    templateUrl: './matcher.component.html',
    styles: [':host { width: 100%; }'],
    providers: [MatcherService, ElderlyPersonsService, VolunteersService]
})
export class MatcherComponent implements OnInit {
    matches: any[] = [];
    persons: Person[] = [];
    personMatches: any[] = [];
    wizardProgress: number = 0;
    targetType: string = '';
    targetPerson: Person;
    targetMatch: any = null;

    @ViewChild('formModal') formModal: ModalDirective;

    constructor(
        private http: Http,
        private matcherService: MatcherService,
        private elderlyPersonsService: ElderlyPersonsService,
        private volunteersService: VolunteersService,
        private modalService: BsModalService
    ) { }

    ngOnInit(): void {
        this.matcherService.getMatches().subscribe(matches => this.matches = matches);
    }

    openCreateModal(): void {
        this.formModal.show();
    }

    goNext(): void {
        if (this.wizardProgress == 0 && this.targetType != '') {
            this.wizardProgress = 1;

            if (this.targetType == 'Oudere')
                this.elderlyPersonsService.getElderlyPersons().subscribe(x => this.persons = x);
            else
                this.volunteersService.getVolunteers().subscribe(x => this.persons = x);
        }

        else if (this.wizardProgress == 1 && this.targetPerson.name != '') {
            this.wizardProgress = 2;

            this.http
                .get('api/matcher/' + this.targetPerson.personId)
                .map(res => res.json())
                .catch(this.handleError).subscribe(x => this.personMatches = x);
        }

        else if (this.wizardProgress == 2 && this.targetMatch != null) {
            this.wizardProgress = 3;

            
        }

        else if (this.wizardProgress == 3) {     
            var match: MatchDTO = new MatchDTO();
            if (this.targetType == 'Oudere') {
                match.elderlyId = this.targetPerson.personId;
                match.volunteerId = this.targetMatch.person.personId;
                match.dateCreated = new Date();

                this.matcherService.addMatch(match).subscribe(x => { this.formModal.hide(); this.wizardProgress = 0; this.ngOnInit(); });
            }
        }
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        //this.toasterService.showToaster('error', 'Oops!! An error occurred', errMsg);
        //this.loaderService.displayLoader(false);
        return Observable.throw(errMsg);
    }
}