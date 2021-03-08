import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigningComponent } from './pages/signing/signing.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    exports: [SigningComponent],
    declarations: [SigningComponent],
    providers: [],
})
export class SharedModule { }
