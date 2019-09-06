import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appInputDate]'
})
export class InputDateDirective {

  constructor(elem: ElementRef, renderer: Renderer2) {
    // Get parent of the original input element
    var parent = elem.nativeElement.parentNode;

    // Create a div
    var divElement = renderer.createElement("div");

    divElement.classList.add('calendar-container');

    // Add the div, just before the input
    renderer.insertBefore(parent, divElement, elem.nativeElement);

    // Remove the input
    renderer.removeChild(parent, elem.nativeElement);

    // Remove the directive attribute (not really necessary, but just to be clean)
    renderer.removeAttribute(elem.nativeElement, "inputWrapper");

    // Re-add it inside the div
    renderer.appendChild(divElement, elem.nativeElement);
  }
}
