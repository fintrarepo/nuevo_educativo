import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    templateUrl: './modalDelete.html',
    styleUrls: ['./modalDelete.scss']
})

// tslint:disable-next-line:component-class-suffix
export class ModalDelete implements OnInit {
    @Input() public document;
    @Output() passEntry: EventEmitter<any> = new EventEmitter();
    constructor(
        private activeModal: NgbActiveModal
    ) { }

    closeModal() {
        this.activeModal.dismiss();
    }
    confirmar() {
        this.activeModal.dismiss();
        this.passEntry.emit(this.document);
    }

    ngOnInit() {
    }
}