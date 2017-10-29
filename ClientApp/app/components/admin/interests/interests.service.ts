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
import { Interest } from "../../../models/interest.model";

@Injectable()
export class InterestsService {
    private url: string = "api/interests";

    constructor(private http: Http) { }

    getInterests(): Observable<Interest[]> {
        return this.http
            .get(this.url)
            .map(res => res.json())
            .catch(this.handleError);
    }

    getInterest(id: number): Observable<Interest> {
        return this.http
            .get(this.getPersonUrl(id))
            .map(res => res.json())
            .catch(this.handleError);
    }

    addInterest(interest: any): Observable<any> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http
            .post(this.url, JSON.stringify(interest), { headers: headers })
            .map(res => res.json())
            .catch(this.handleError);
    }

    updateInterest(interest: any) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http
            .put(this.getPersonUrl(interest.interestId), JSON.stringify(interest), { headers: headers })
            .map(res => res.json())
            .catch(this.handleError);
    }

    deleteInterest(id: number) {
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
