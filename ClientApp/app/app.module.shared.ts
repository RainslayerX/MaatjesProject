import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule  } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { ElderlyPersonsComponent } from './components/elderlypersons/elderlypersons.component';

import { PersonInterestsComponent } from "./components/personinterests/personinterests.component";
import { ModalModule } from "ngx-bootstrap/modal";
import { VolunteersComponent } from "./components/volunteers/volunteers.component";
import { MatcherComponent } from "./components/matcher/matcher.component";

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        ElderlyPersonsComponent,
        PersonInterestsComponent,
        VolunteersComponent,
        MatcherComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'elderlypersons', component: ElderlyPersonsComponent },
            { path: 'volunteers', component: VolunteersComponent },
            { path: 'matcher', component: MatcherComponent },
            { path: '**', redirectTo: 'home' }
        ]),
        ModalModule.forRoot()
    ]
})
export class AppModuleShared {
}
