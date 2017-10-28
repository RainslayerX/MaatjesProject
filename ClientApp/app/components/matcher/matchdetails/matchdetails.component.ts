import { Component, OnInit, ViewContainerRef, TemplateRef, ViewChild, ContentChild } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Observable";

import { BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { ElderlyPersonsService } from "../../elderlypersons/elderlypersons.service";
import { VolunteersService } from "../../volunteers/volunteers.service";
import { MatcherService } from "../matcher.service";

import { Match } from "../../../models/match.model";

@Component({
    selector: 'matchdetails',
    templateUrl: './matchdetails.component.html',
    styles: [':host { width: 100%; }'],
    providers: [MatcherService]
})
export class MatchDetailsComponent implements OnInit {
    match: Match = new Match();
    errorMessage: string;

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.matcherService.getMatch(params['id']).subscribe(
                result => { this.match = result },
                error => { });
        });
    }

    constructor(
        private http: Http,
        private matcherService: MatcherService,
        private modalService: BsModalService,
        private route: ActivatedRoute
    ) { }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        //this.toasterService.showToaster('error', 'Oops!! An error occurred', errMsg);
        //this.loaderService.displayLoader(false);
        return Observable.throw(errMsg);
    }
}