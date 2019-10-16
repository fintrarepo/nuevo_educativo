import { Component, OnInit, Input} from '@angular/core';
import { CreditsService } from '../../services/credits/credits.service';

@Component({
  selector: 'app-history-request',
  templateUrl: './history-request.component.html',
  styleUrls: ['./history-request.component.scss']
})
export class HistoryRequestComponent implements OnInit {
  @Input('history') history: any[];
  @Input('loading') loading: any;
  
  constructor(private serv: CreditsService ) { }

  ngOnInit() {
  }
}
