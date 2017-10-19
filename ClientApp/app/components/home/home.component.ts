import { Component, OnInit } from '@angular/core';
import { Person } from "../../models/person.model";
import { Http } from '@angular/http';
import { MatcherService } from "../matcher/matcher.service";

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styles: [':host { width: 100%; }'],
    providers: [MatcherService]
})
export class HomeComponent implements OnInit {
    availablePersons: any[];
    matches: any[];

    constructor(private http: Http, private matcherService: MatcherService) { }

    ngOnInit() {
        this.updateAvailablePersons(0);
        this.matcherService.getMatches().subscribe(matches => this.matches = matches);
    }

    updateAvailablePersons(value: number): void {
        this.availablePersons = [];

        if (value == 0 || value == 1) {
            this.http.get('/api/elderlypeople/available/')
                .map(res => res.json())
                .subscribe(x => this.availablePersons = this.availablePersons.concat(x));
        } if (value == 0 || value == 2) {
            this.http.get('/api/volunteers/available/')
                .map(res => res.json())
                .subscribe(x => this.availablePersons = this.availablePersons.concat(x));
        }
    }
}
