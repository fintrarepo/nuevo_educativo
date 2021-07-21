import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    templateUrl: './modalPdf.html',
    styleUrls: ['./modalPdf.scss']
})

// tslint:disable-next-line:component-class-suffix
export class ModalPdf implements OnInit {
    @Input() public url_pdf;

    constructor(
        private activeModal: NgbActiveModal
    ) { }

    closeModal() {
        this.activeModal.dismiss();
    }

    ngOnInit() {}
}