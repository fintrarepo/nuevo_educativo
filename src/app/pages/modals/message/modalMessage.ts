import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    templateUrl: './modalMessage.html',
    styleUrls: ['./modalMessage.scss']
})

// tslint:disable-next-line:component-class-suffix
export class ModalMessage implements OnInit {

    constructor(
        private activeModal: NgbActiveModal
    ) { }

    closeModal() {
        this.activeModal.dismiss();
    }

    ngOnInit() {
    }
}