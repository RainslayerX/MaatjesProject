import { Component, TemplateRef } from '@angular/core';
import { Person } from "../../models/person.model";
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Observable";

// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

// Observable operators
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import * as $ from "jquery";
import { BsModalService } from "ngx-bootstrap/modal";
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { Interest } from "../../models/interest.model";

@Component({
    selector: 'personinterests',
    templateUrl: './personinterests.component.html',
    styles: [':host { width: 100%; }']
})
export class PersonInterestsComponent {
    interestsModal: BsModalRef;

    personInterests: Interest[];
    interests: Interest[];

    addInterestModal: any;

    constructor(private http: Http, private modalService: BsModalService) { }

    private personId: number;
    public config = {
        animated: true,
        keyboard: true,
        backdrop: true,
        ignoreBackdropClick: true
    };

    update(personId: number): void {
        this.personId = personId;

        var data = this.http
            .get('/api/personinterests/' + personId)
            .map(res => res.json())
            .catch(this.handleError);

        data.subscribe(result => this.personInterests = result);
    }

    openAddInterestModal(template: TemplateRef<any>): void {
        //$('#interestsModal').modal('show');
        this.interestsModal = this.modalService.show(template, Object.assign({}, this.config, { class: 'darker-bg' }));

        var data = this.http
            .get('/api/interests/')
            .map(res => res.json())
            .catch(this.handleError);

        data.subscribe(result => this.interests = result);
    }

    addInterestToPerson(interest: Interest) {
        var data = { InterestId: interest.interestId, PersonId: this.personId };
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http
            .post('/api/personinterests', JSON.stringify(data), { headers: headers })
            .map(res => res.json())
            .catch(this.handleError).subscribe(x => { this.interestsModal.hide(); this.update(this.personId); });
    }

    deleteInterestFromPerson(interest: Interest)
    {
        this.http
            .delete('/api/personinterests/' + this.personId + '/' + interest.interestId)
            .map(res => res.json())
            .catch(this.handleError).subscribe(x => this.update(this.personId));
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