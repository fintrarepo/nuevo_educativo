import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigningComponent } from './pages/signing/signing.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalTermns } from './pages/modals/terminos/modalTermns';
import { ModalMessage } from './pages/modals/message/modalMessage';
import { ModalPdf } from './pages/modals/pdf/modalPdf';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgxExtendedPdfViewerModule
    ],
    exports: [SigningComponent],
    declarations: [
        SigningComponent,
        ModalTermns,
        ModalMessage,
        ModalPdf
    ],
    entryComponents: [
        ModalTermns,
        ModalMessage,
        ModalPdf
    ],
    providers: [],
})
export class SharedModule { }
