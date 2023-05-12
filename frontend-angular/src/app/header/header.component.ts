import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UtilsService} from "../shared/services/utils.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();
  public title: string = "";

  constructor(private utilsService: UtilsService) {
    this.title = this.utilsService.getAppTitle();
  }

  ngOnInit(): void {
  }

  public onToggleSidenav(): void {
    this.sidenavToggle.emit();
  }

  public openMiniatureDialog(): void {
    // TODO: implement opening the Miniature Dialog
  }

}
