import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    templateUrl: './modalPdf.html',
    styleUrls: ['./modalPdf.scss']
})

// tslint:disable-next-line:component-class-suffix
export class ModalPdf implements OnInit {
    @Input() public url_pdf;
    validar:boolean=false;
    constructor(
        private activeModal: NgbActiveModal
    ) { }

    closeModal() {
        this.activeModal.dismiss();
    }

    ngOnInit() {
        if(this.url_pdf.substring(0,1)=='*'){
            this.url_pdf=this.url_pdf.substring(1)
            this.validar=true;
        }else{
            this.validar=false;
        }
        
    }
}