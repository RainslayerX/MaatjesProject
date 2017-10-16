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

import { ElderlyPerson } from "../../models/elderlypeople.model";

@Injectable()
export class ElderlyPersonsService {
    private url: string = "api/elderlypersons";

    constructor(private http: Http) { }

    getElderlyPersons(): Observable<ElderlyPerson[]> {
        return this.http
            .get(this.url)
            .map(res => res.json())
            .catch(this.handleError);
    }

    getElderlyPerson(id: number): Observable<ElderlyPerson> {
        return this.http
            .get(this.getPersonUrl(id))
            .map(res => res.json())
            .catch(this.handleError);
    }

    addElderlyPerson(person: any): Observable<any> {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http
            .post(this.url, JSON.stringify(person), { headers: headers })
            .map(res => res.json())
            .catch(this.handleError);
    }

    updateElderlyPerson(person: any) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http
            .put(this.getPersonUrl(person.personId), JSON.stringify(person), { headers: headers })
            .map(res => res.json())
            .catch(this.handleError);
    }

    deleteElderlyPerson(id: number) {
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
