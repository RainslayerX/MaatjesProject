import { Component, OnInit, ViewContainerRef, TemplateRef, ViewChild, ContentChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

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
    comments: any[] = [];
    commentText: string = "";
    errorMessage: string;
    
    public deleteModal: BsModalRef;
    public config = {
        animated: true,
        keyboard: true,
        backdrop: true,
        ignoreBackdropClick: false
    };
    public deleteModalContent: any = {};

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.matcherService.getMatch(params['id']).subscribe(
                result => {
                    this.match = result;
                    this.http.get('api/matches/comments/' + this.match.matchId).subscribe(
                        result => { this.comments = result.json() }
                    );
                },
                error => { });
        });
    }

    constructor(
        private http: Http,
        private matcherService: MatcherService,
        private modalService: BsModalService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    deleteMatch(template: TemplateRef<any>): void {
        this.deleteModal = this.modalService.show(template, Object.assign({}, this.config, { class: 'darker-bg' }));
        this.deleteModalContent.title = 'Waarschuwing';
        this.deleteModalContent.bodyText = 'Weet u zeker dat u deze match wilt stoppen?';
        this.deleteModalContent.okAction = () => {
            this.http.delete('api/matches/' + this.match.matchId).subscribe(result => {
                this.deleteModal.hide();
                this.router.navigate(['matcher']);
            });
        };        
    }

    addComment(): void {
        this.http.post('api/comments', { text: this.commentText, matchId: this.match.matchId, dateCreated: Date.now() }).subscribe(
            result => {
                this.commentText = "";
                this.http.get('api/matches/comments/' + this.match.matchId).subscribe(
                    result => { this.comments = result.json() }
                );
            }
        );
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