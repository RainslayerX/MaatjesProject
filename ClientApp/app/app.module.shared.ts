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

import { AuthGuard } from "./components/security/auth-guard.service";
import { AuthService } from "./components/security/auth.service";
import { LoginComponent } from "./components/login/login.component";

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        ElderlyPersonsComponent,
        PersonInterestsComponent,
        VolunteersComponent,
        MatcherComponent,
        LoginComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'login', component: LoginComponent},
            { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
            { path: 'elderlypersons', component: ElderlyPersonsComponent, canActivate: [AuthGuard] },
            { path: 'volunteers', component: VolunteersComponent, canActivate: [AuthGuard] },
            { path: 'matcher', component: MatcherComponent, canActivate: [AuthGuard] },
            { path: '**', redirectTo: 'home' }
        ]),
        ModalModule.forRoot()
    ],
    providers: [AuthGuard, AuthService]
})
export class AppModuleShared {
}
