import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  @Input('currentStep')  currentStep : number = 1;

  oneStepNumber : number = 1;
  twoStepNumber : number = 2;
  thirdStepNumber : number = 3;
  fourStepNumber : number = 4;
  constructor() { }

  ngOnInit() {
  }

  getImage(step, img) {

    return step < this.currentStep ?
      img.replace('.svg', '_Verde.svg') :
      step > this.currentStep ? img.replace('.svg', '_Gris.svg') : img

  }

}
