import {Component, OnInit} from '@angular/core';
import {UtilsService} from "../shared/services/utils.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public appVersion: string = "";

  constructor(private utilsService: UtilsService) {
    this.appVersion = this.utilsService.getAppVersion();
  }

  ngOnInit(): void {
  }

}
