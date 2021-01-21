import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    templateUrl: './modalTermns.html',
    styleUrls: ['./modalTermns.scss']
})

// tslint:disable-next-line:component-class-suffix
export class ModalTermns implements OnInit {

    constructor(
        private activeModal: NgbActiveModal
    ) {
    }

    closeModal() {
        this.activeModal.close();
    }

    ngOnInit() {
    }
}