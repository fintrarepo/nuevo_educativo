import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  @Input('currentStep') currentStep: number = 0;

  oneStepNumber: number = 0;
  twoStepNumber: number = 1;
  thirdStepNumber: number = 2;
  fourStepNumber: number = 3;
  constructor() { }

  ngOnInit() {
  }

  getImage(step, img) {

    return this.currentStep == step ? img : step < this.currentStep ?
      img.replace('.svg', '_Verde.svg') :
      step > this.currentStep ? img.replace('.svg', '_Gris.svg') : img
      
  }

}
