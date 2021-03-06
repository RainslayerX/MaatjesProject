﻿import { Person } from "./person.model";
import { Volunteer } from "./volunteer.model";
import { ElderlyPerson } from "./elderlypeople.model";

export class Match {
    matchId: number;
    dateCreated: Date;
    volunteer: Person = new Volunteer();
    elderly: Person = new ElderlyPerson();
} 

export class MatchDTO {
    dateCreated: Date;
    volunteerId: number;
    elderlyId: number;
} 

export class Comment {
    commentId: number;
    text: string;
    dateCreated: Date;
    volunteer: Volunteer;
} 