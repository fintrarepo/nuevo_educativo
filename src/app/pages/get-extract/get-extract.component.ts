import { Component, OnInit } from "@angular/core";
import { UtilsService } from "../../services/utils/utils.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-get-extract",
  templateUrl: "./get-extract.component.html",
  styleUrls: ["./get-extract.component.scss"],
})
export class GetExtractComponent implements OnInit {

  extract;
  idExtract;

  constructor(public utils: UtilsService,  private route: ActivatedRoute,) {
    this.idExtract = this.route.snapshot.paramMap.get("id");
  }

  ngOnInit() {
    this.utils.getExtract(this.idExtract).subscribe((response) => {
      this.extract = response.data;
    });
  }
}
