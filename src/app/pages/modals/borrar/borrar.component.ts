import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-borrar',
  templateUrl: './borrar.component.html',
  styleUrls: ['./borrar.component.scss']
})
export class BorrarComponent implements OnInit {

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
