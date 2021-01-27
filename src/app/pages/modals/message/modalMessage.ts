import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    templateUrl: './modalMessage.html',
    styleUrls: ['./modalMessage.scss']
})

// tslint:disable-next-line:component-class-suffix
export class ModalMessage implements OnInit {
    @Input() public message;

    constructor(
        private activeModal: NgbActiveModal
    ) { }

    closeModal() {
        this.activeModal.dismiss();
    }

    ngOnInit() {
        console.log(this.message.value);
        this.message.value = ' ' + this.returnEmailHiden(this.message.value);

    }

    returnEmailHiden(cadena: string) {
        const pos = cadena.indexOf("@");
        const countChar = cadena.length - (pos + 4);
        let newCadena = cadena.substring(0, 1) + '*'.repeat(countChar) + cadena.substring(pos - 1, cadena.length);
        return newCadena;
    }
}