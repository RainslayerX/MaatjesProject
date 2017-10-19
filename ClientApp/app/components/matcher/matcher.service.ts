import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Observable";

// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

// Observable operators
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import { Match } from "../../models/match.model";

@Injectable()
export class MatcherService {
    private url: string = "api/matches";

    constructor(private http: Http) { }

    getMatches(): Observable<any[]> {
        return this.http
            .get(this.url)
            .map(res => res.json())
            .catch(this.handleError);
    }

    getMatch(id: number): Observable<Match> {
        return this.http
            .get(this.getPersonUrl(id))
            .map(res => res.json())
            .catch(this.handleError);
    }

    addMatch(person: any): Observable<any> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http
            .post(this.url, JSON.stringify(person), { headers: headers })
            .map(res => res.json())
            .catch(this.handleError);
    }

    updateMatch(person: any) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http
            .put(this.getPersonUrl(person.personId), JSON.stringify(person), { headers: headers })
            .map(res => res.json())
            .catch(this.handleError);
    }

    deleteMatch(id: number) {
        return this.http
            .delete(this.getPersonUrl(id))
            .map(res => res.json())
            .catch(this.handleError);
    }

    private getPersonUrl(id: number) {
        return this.url + "/" + id;
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
