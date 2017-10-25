import { Component, OnInit, ViewContainerRef, TemplateRef, ViewChild, ContentChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

import { PersonInterestsComponent } from "../personinterests/personinterests.component";

import * as $ from "jquery";

@Component({
    selector: 'usersettings',
    templateUrl: './usersettings.component.html',
    styles: [':host { width: 100%; }']
})
export class UserSettingsComponent {

}